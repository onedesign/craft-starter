<?php
/**
 * Database Configuration
 *
 * All of your system's database connection settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/DbConfig.php.
 *
 * @see craft\config\DbConfig
 */

/**
 * This grabs the dynamic env var for database URL because it may be managed automatically
 * by the hosting provider (e.g. The env contains "DATABASE_URL=mysql://user:pass@host:port/database_name").
 */
if (getenv('DATABASE_URL')) {
    $databaseConfig = parse_url(getenv('DATABASE_URL'));
    $databaseConfig['driver'] = $databaseConfig['scheme'];
// Fallback to default Craft config vars
} else {
    $databaseConfig = [
        'dsn' => getenv('DB_DSN'),
        'driver' => getenv('DB_DRIVER') ?? 'mysql',
        'host' => getenv('DB_SERVER'),
        'user' => getenv('DB_USER'),
        'pass' => getenv('DB_PASSWORD'),
        'path' => getenv('DB_DATABASE'),
        'port' => getenv('DB_PORT') ?? 3306
    ];
}

return [
    'dsn' => $databaseConfig['dsn'],
    'driver' => $databaseConfig['driver'],

    // The database server name or IP address.
    // Usually this is 'localhost' or '127.0.0.1'.
    'server' => $databaseConfig['host'],

    // The database username to connect with.
    'user' => $databaseConfig['user'],

    'port' => $databaseConfig['port'],

    // The database password to connect with.
    'password' => $databaseConfig['pass'],

    // The name of the database to select.
    'database' => trim($databaseConfig['path'], '/'),

    // This is only used for Postgres Databases
    'schema' => getenv('DB_SCHEMA'),

    // The prefix to use when naming tables.
    // This can be no more than 5 characters.
    'tablePrefix' => getenv('DB_TABLE_PREFIX'),
];
