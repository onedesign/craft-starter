<?php
/**
 * Shared bootstrap file
 */

// Define path constants
define('CRAFT_BASE_PATH', __DIR__);
define('CRAFT_VENDOR_PATH', CRAFT_BASE_PATH . '/vendor');

// Load Composer's autoloader
require_once CRAFT_VENDOR_PATH . '/autoload.php';

// Load dotenv?
if (class_exists(Dotenv\Dotenv::class)) {
    // By default, this will allow .env file values to override environment variables
    // with matching names. Use `createUnsafeImmutable` to disable this.
    Dotenv\Dotenv::createUnsafeMutable(CRAFT_BASE_PATH)->safeLoad();
}

// In dev, derive the site URL from the request so the site works on any host
// it's reached through (ddev.site, `ddev share` tunnels, LAN addresses on mobile).
$requestHost = $_SERVER['HTTP_X_FORWARDED_HOST'] ?? $_SERVER['HTTP_HOST'] ?? null;
if (getenv('CRAFT_ENVIRONMENT') === 'dev' && $requestHost) {
    $isHttps = ($_SERVER['HTTPS'] ?? '') === 'on' || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https';
    $requestHost = trim(explode(',', $requestHost)[0]);
    $siteUrl = ($isHttps ? 'https' : 'http') . '://' . $requestHost;
    $_SERVER['PRIMARY_SITE_URL'] = $siteUrl;
    putenv("PRIMARY_SITE_URL=$siteUrl");
}
