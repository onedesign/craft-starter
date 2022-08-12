<?php
/**
 * Yii Application Config
 *
 * Edit this file at your own risk!
 *
 * The array returned by this file will get merged with
 * vendor/craftcms/cms/src/config/app.php and app.[web|console].php, when
 * Craft's bootstrap script is defining the configuration for the entire
 * application.
 *
 * You can define custom modules and system components, and even override the
 * built-in system components.
 *
 * If you want to modify the application config for *only* web requests or
 * *only* console requests, create an app.web.php or app.console.php file in
 * your config/ folder, alongside this one.
 */

use craft\helpers\App;
use craft\mail\transportadapters\Smtp;
use modules\Module;

return [
    '*' => [
        'id' => App::env('CRAFT_APP_ID') ?: 'CraftCMS',
        'modules' => [
            'my-module' => Module::class,
        ],
        //'bootstrap' => ['my-module'],
    ],
    'dev' => [
        'components' => [
            'mailer' => function() {
                $settings = App::mailSettings();
                $settings->transportType = Smtp::class;
                $settings->transportSettings = [
                    'host' => '127.0.0.1',
                    'port' => '1025',
                    'useAuthentication' => false,
                ];

                $config = App::mailerConfig($settings);
                return Craft::createObject($config);
            },
        ]
    ]
];
