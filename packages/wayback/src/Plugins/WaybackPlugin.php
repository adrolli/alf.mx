<?php

namespace Moox\Wayback\Plugins;

use Filament\Contracts\Plugin;
use Filament\Panel;
use Moox\Core\Support\Resources\ChildResourceRegistrar;
use Moox\Wayback\Resources\WaybackResource;

class WaybackPlugin implements Plugin
{
    public function getId(): string
    {
        return 'wayback';
    }

    public function register(Panel $panel): void
    {
        ChildResourceRegistrar::registerFromParentDefinition(
            $panel,
            WaybackResource::class,
            'wayback',
            config('wayback.resources.wayback', []),
        );
    }

    public function boot(Panel $panel): void
    {
        //
    }

    public static function make(): static
    {
        return app(static::class);
    }
}
