<?php

declare(strict_types=1);

namespace Moox\Wayback;

use Filament\Support\Facades\FilamentView;
use Filament\Tables\View\TablesRenderHook;
use Illuminate\Support\Facades\Blade;
use Moox\Core\MooxServiceProvider;
use Moox\Wayback\Resources\WaybackResource\Pages\ListWayback;
use Spatie\LaravelPackageTools\Package;

class WaybackServiceProvider extends MooxServiceProvider
{
    public function configureMoox(Package $package): void
    {
        $package
            ->name('wayback')
            ->hasConfigFile()
            ->hasTranslations()
            ->hasMigrations('create_waybacks_table', 'create_wayback_translations_table')
            ->hasCommands();
    }

    public function packageBooted(): void
    {
        FilamentView::registerRenderHook(
            TablesRenderHook::TOOLBAR_SEARCH_BEFORE,
            fn (): string => Blade::render('@include("localization::lang-selector")'),
            scopes: ListWayback::class
        );
    }
}
