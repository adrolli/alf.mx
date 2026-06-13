<?php

namespace Moox\Wayback\Resources\WaybackResource\Pages;

use Moox\Core\Entities\Items\Draft\Pages\BaseCreateDraft;
use Moox\Wayback\Resources\WaybackResource;

class CreateWayback extends BaseCreateDraft
{
    protected static string $resource = WaybackResource::class;
}
