<?php
/**
 * Configuration for asset rev plugin
 *
 * @link https://github.com/clubstudioltd/craft3-asset-rev#configuration
 */

// This allows us to use a CDN for serving assets directly on the site
// Set ASSET_REV_CDN_URL_PREFIX to something like https://268409-832646-raikfcquaxqncofqfm.stackpathdns.com

use club\assetrev\utilities\strategies\ManifestFileStrategy;
use club\assetrev\utilities\strategies\QueryStringStrategy;

if (getenv('ASSET_REV_CDN_URL_PREFIX')) {
    $assetUrlPrefix = rtrim(getenv('ASSET_REV_CDN_URL_PREFIX'), '/') . '/dist/';
} else {
    $assetUrlPrefix = '/dist/';
}

return [
    '*' => [
        'strategies' => [
            'manifest' => ManifestFileStrategy::class,
            'querystring' => QueryStringStrategy::class,
            'passthrough' => function($filename) {
                return $filename;
            },
        ],
        'pipeline' => 'manifest|querystring|passthrough',
        'manifestPath' => 'web/dist/rev-manifest.json',
        'assetsBasePath' => 'web/dist/',
        'assetUrlPrefix' => $assetUrlPrefix
    ]
];
