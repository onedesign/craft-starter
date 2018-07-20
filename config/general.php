<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see craft\config\GeneralConfig
 */

// No components defined by default
$components = [];

/**
 * Converts the redis url in the ENV vars to what php expects for the session config
 * This depends on yiisoft/yii2-redis in composer.json
 */
if (getenv('REDIS_URL')) {
    $redisConfig = parse_url(getenv('REDIS_URL'));

    $components['redis'] = [
        'class' => 'yii\redis\Connection',
        'hostname' => $redisConfig['host'],
        'port' => $redisConfig['port'],
        'database' => 0,
        'password' => $redisConfig['pass']
    ];

    $components['session'] = [
        'class' => yii\redis\Session::class,
    ];
}

return [
    // Global settings
    '*' => [
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 0,

        // Enable CSRF Protection (recommended)
        'enableCsrfProtection' => true,

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        // Control Panel trigger word
        'cpTrigger' => 'admin',

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => getenv('SECURITY_KEY'),

        // This contains info like session, cache, redis, etc.
        'components' => $components
    ],

    // Dev environment settings
    'dev' => [
        // Base site URL
        'siteUrl' => null,

        // Dev Mode (see https://craftcms.com/support/dev-mode)
        'devMode' => true,
    ],

    // Staging environment settings
    'staging' => [
        // Base site URL
        'siteUrl' => null,
    ],

    // Production environment settings
    'production' => [
        // Base site URL
        'siteUrl' => null,
    ],
];
