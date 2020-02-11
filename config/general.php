<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

// No components defined by default
$components = [];


if (getenv('REDIS_URL') && !empty(getenv('REDIS_URL'))) {
    /**
     * This converts the redis url in the ENV vars to what php expects for the session config
     * This depends on yiisoft/yii2-redis in composer.json
     */
    $redisConfig = parse_url(getenv('REDIS_URL'));

    // Adds the redis connection info for use by the session and cache components
    $components['redis'] = [
        'class' => 'yii\redis\Connection',
        'hostname' => $redisConfig['host'],
        'port' => $redisConfig['port'],
        'database' => 0,
        'password' => $redisConfig['pass']
    ];

    // Configures the session to use the redis adapter
    $components['session'] = [
        'class' => yii\redis\Session::class,
    ];

    // Configures the data cache layer to use the redis adapter
    $components['cache'] = [
        'class' => yii\redis\Cache::class,
        'defaultDuration' => 86400
    ];

    // PHP expects the redis session URL to look differently than what we get in the
    // REDIS_URL from something like Heroku.
    $phpRedisUrl = 'tcp://' . $redisConfig['host'] . ':' . $redisConfig['port'];
    if (!empty($redisConfig['user']) && !empty($redisConfig['pass'])) {
        $phpRedisUrl .= "?auth=" . $redisConfig['pass'];
    }

    // Sets the URL for php to know that redis should be used for sessions
    // Without this, Craft still uses file storage for sessions
    ini_set('session.save_handler', 'redis');
    ini_set('session.save_path', $phpRedisUrl);
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

        // Whether to save the project config out to config/project.yaml
        // (see https://docs.craftcms.com/v3/project-config.html)
        'useProjectConfigFile' => true,

        // This contains info like session, cache, redis, etc.
        'components' => $components,

        // Disable system and plugin updates in the Control Panel
        'allowUpdates' => false,

        // Dont allow more than 25 revisions otherwise DB gets huge
        'maxRevisions' => 25,
    ],

    // Dev environment settings
    'dev' => [
        // Dev Mode (see https://craftcms.com/guides/what-dev-mode-does)
        'devMode' => true,
    ],

    // Staging environment settings
    'staging' => [
        // Set this to `false` to prevent administrative changes from being made on staging
        'allowAdminChanges' => false,
    ],

    // Production environment settings
    'production' => [
        // Set this to `false` to prevent administrative changes from being made on production
        'allowAdminChanges' => false,
    ],
];
