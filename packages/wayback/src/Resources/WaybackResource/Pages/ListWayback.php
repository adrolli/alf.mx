<?php

namespace Moox\Wayback\Resources\WaybackResource\Pages;

use Moox\Core\Traits\Tabs\HasListPageTabs;
use Moox\Wayback\Models\Wayback;
use Moox\Wayback\Resources\WaybackResource;

class ListWayback extends BaseListDraft
{
    use HasListPageTabs;

    protected static string $resource = WaybackResource::class;

    public function getTabs(): array
    {
        return $this->getDynamicTabs('wayback.resources.wayback.tabs', Wayback::class);
    }
}
