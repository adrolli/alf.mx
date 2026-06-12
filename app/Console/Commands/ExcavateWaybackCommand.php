<?php

namespace App\Console\Commands;

use DOMDocument;
use DOMXPath;
use Illuminate\Console\Command;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;

class ExcavateWaybackCommand extends Command
{
    protected $signature = 'excavate:wayback {url}';

    protected $description = 'Excavate a Wayback Machine snapshot into public/archive/YYYY/HOST';

    protected string $timestamp;

    protected string $year;

    protected string $originalUrl;

    protected string $host;

    protected string $target;

    protected string $publicBase;

    protected array $seen = [];

    /** @var list<array{0: string, 1: string}> */
    protected array $queue = [];

    public function handle(): int
    {
        $url = $this->argument('url');

        if (! $this->parseSnapshotUrl($url)) {
            $this->error('Invalid Wayback snapshot URL.');

            return self::FAILURE;
        }

        $this->target = public_path("archive/{$this->year}/{$this->host}");
        $this->publicBase = "/archive/{$this->year}/{$this->host}";

        File::ensureDirectoryExists($this->target);

        $this->info("Target: {$this->target}");

        $this->enqueue($this->originalUrl, 'index.html');

        while ($this->queue !== []) {
            [$originalUrl, $localPath] = array_shift($this->queue);
            $this->crawl($originalUrl, $localPath);
        }

        $this->info('Done.');

        return self::SUCCESS;
    }

    protected function parseSnapshotUrl(string $url): bool
    {
        if (! preg_match('#web\.archive\.org/web/(\d{14})[^/]*/(https?://([^/]+).*)#', $url, $m)) {
            return false;
        }

        $this->timestamp = $m[1];
        $this->year = substr($this->timestamp, 0, 4);
        $this->originalUrl = $m[2];
        $this->host = $m[3];

        return true;
    }

    protected function enqueue(string $originalUrl, string $localPath): void
    {
        $canonical = $this->canonicalUrl($originalUrl);

        if (isset($this->seen[$canonical])) {
            return;
        }

        $this->seen[$canonical] = true;
        $this->queue[] = [$canonical, ltrim($localPath, '/')];
    }

    protected function crawl(string $originalUrl, string $localPath): void
    {
        $localPath = ltrim($localPath, '/');

        $waybackUrl = $this->waybackUrl($originalUrl, $localPath);

        $this->line("GET {$waybackUrl}");

        try {
            usleep(500000);

            $response = Http::timeout(60)
                ->connectTimeout(20)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (compatible; Excavator/0.1)',
                ])
                ->retry(5, 2000, fn ($exception) => $exception instanceof ConnectionException, throw: false)
                ->get($waybackUrl);
        } catch (ConnectionException|RequestException $e) {
            $this->warn("Connection failed, skipped: {$waybackUrl}");

            return;
        }

        if (! $response->successful()) {
            $this->warn("Not found ({$response->status()}), skipped: {$waybackUrl}");

            return;
        }

        $body = $response->body();
        $contentType = $response->header('content-type', '');

        if (str_contains($contentType, 'text/html')) {
            $body = $this->rewriteHtml($body, $originalUrl);
        } elseif (str_contains($contentType, 'text/css')) {
            $body = $this->rewriteCss($body, $originalUrl);
        }

        $absolutePath = "{$this->target}/{$localPath}";
        File::ensureDirectoryExists(dirname($absolutePath));
        File::put($absolutePath, $body);
    }

    protected function waybackUrl(string $originalUrl, ?string $localPath = null): string
    {
        $ext = strtolower(pathinfo(parse_url($localPath ?? $originalUrl, PHP_URL_PATH) ?? '', PATHINFO_EXTENSION));

        $mode = match ($ext) {
            'css' => 'cs_',
            'js' => 'js_',
            'jpg', 'jpeg', 'gif', 'png', 'webp', 'svg', 'ico' => 'im_',
            default => 'id_',
        };

        return "https://web.archive.org/web/{$this->timestamp}{$mode}/{$originalUrl}";
    }

    protected function rewriteHtml(string $html, string $baseUrl): string
    {
        libxml_use_internal_errors(true);

        $dom = new DOMDocument;
        $dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

        $xpath = new DOMXPath($dom);

        $effectiveBase = $this->resolveHtmlBase($xpath, $baseUrl);

        foreach (['href', 'src', 'action', 'background'] as $attr) {
            foreach ($xpath->query("//*[@{$attr}]") as $node) {
                $value = $node->getAttribute($attr);

                $local = $this->localizeUrl($value, $effectiveBase);

                if ($local) {
                    $node->setAttribute($attr, $local);
                }
            }
        }

        return $dom->saveHTML();
    }

    protected function resolveHtmlBase(DOMXPath $xpath, string $pageUrl): string
    {
        $baseNode = $xpath->query('//base[@href]')->item(0);

        if ($baseNode === null) {
            return $pageUrl;
        }

        $href = trim($baseNode->getAttribute('href'));

        if ($href === '') {
            return $pageUrl;
        }

        return $this->normalizeUrl($href, $pageUrl) ?? $pageUrl;
    }

    protected function rewriteCss(string $css, string $baseUrl): string
    {
        return preg_replace_callback(
            '#url\((["\']?)(.*?)\1\)#i',
            function ($m) use ($baseUrl) {
                $local = $this->localizeUrl($m[2], $baseUrl);

                return $local
                    ? "url({$local})"
                    : $m[0];
            },
            $css
        );
    }

    protected function localizeUrl(string $url, string $baseUrl): ?string
    {
        $url = trim($url);

        if ($url === '' || str_starts_with($url, '#') || str_starts_with($url, 'mailto:') || str_starts_with($url, 'javascript:')) {
            return null;
        }

        $original = $this->normalizeUrl($url, $baseUrl);

        if (! $original) {
            return null;
        }

        $host = parse_url($original, PHP_URL_HOST);

        if ($host !== $this->host && $host !== preg_replace('#^www\.#', '', $this->host)) {
            return null;
        }

        $path = parse_url($original, PHP_URL_PATH) ?: '/';

        $localPath = ltrim($path, '/');

        if ($localPath === '') {
            $localPath = 'index.html';
        }

        if (! pathinfo($localPath, PATHINFO_EXTENSION)) {
            $localPath = rtrim($localPath, '/').'/index.html';
        }

        $this->enqueue($original, $localPath);

        return $this->publicBase.'/'.$localPath;
    }

    protected function canonicalUrl(string $url): string
    {
        $parts = parse_url($url);

        $scheme = $parts['scheme'] ?? 'http';
        $host = $parts['host'] ?? '';
        $path = $parts['path'] ?? '/';

        if ($path !== '/' && str_ends_with($path, '/')) {
            $path = rtrim($path, '/');
        }

        return "{$scheme}://{$host}{$path}";
    }

    protected function normalizeUrl(string $url, string $baseUrl): ?string
    {
        $url = preg_replace('/[#?].*$/', '', trim($url)) ?? trim($url);

        $unwrapped = $this->unwrapWaybackUrl($url);

        if ($unwrapped !== null) {
            return $unwrapped;
        }

        if (str_starts_with($url, 'http://') || str_starts_with($url, 'https://')) {
            return $url;
        }

        $base = parse_url($baseUrl);

        if (! $base || empty($base['scheme']) || empty($base['host'])) {
            return null;
        }

        if (str_starts_with($url, '/')) {
            return "{$base['scheme']}://{$base['host']}".$this->normalizePath($url);
        }

        $dir = isset($base['path'])
        ? dirname($base['path'])
        : '';

        $path = $this->normalizePath($dir.'/'.$url);

        return "{$base['scheme']}://{$base['host']}{$path}";
    }

    protected function unwrapWaybackUrl(string $url): ?string
    {
        if (preg_match('#web\.archive\.org/web/\d+[a-z_]*?/(https?://.+)#', $url, $matches)) {
            return $this->normalizeWaybackOriginalUrl($matches[1]);
        }

        if (preg_match('#/web/\d{14}[a-z_]*?/(https?:/?/.+)#', $url, $matches)) {
            return $this->normalizeWaybackOriginalUrl($matches[1]);
        }

        return null;
    }

    protected function normalizeWaybackOriginalUrl(string $url): string
    {
        if (preg_match('#^(https?):/(?!/)#', $url)) {
            return preg_replace('#^(https?):/#', '$1://', $url);
        }

        return $url;
    }

    protected function normalizePath(string $path): string
    {
        $parts = [];

        foreach (explode('/', $path) as $part) {
            if ($part === '' || $part === '.') {
                continue;
            }

            if ($part === '..') {
                array_pop($parts);

                continue;
            }

            $parts[] = $part;
        }

        return '/'.implode('/', $parts);
    }
}
