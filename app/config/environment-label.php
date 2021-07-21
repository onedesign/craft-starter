<?php
/**
 * Configuration for environment label plugin
 *
 * @link https://github.com/TopShelfCraft/Environment-Label#configuration
 */
return [
    'showLabel' => filter_var(
        getenv('APP_ENV_LABEL'),
        FILTER_VALIDATE_REGEXP,
        [
            'options' => ['regexp' => "/.*/"]
        ]
    ),
    'labelText' => getenv('APP_ENV_LABEL'),
    'prefix' => null,
    'suffix' => null,
    'labelColor' => '#0085a1',
    'textColor' => '#ffffff',
];
