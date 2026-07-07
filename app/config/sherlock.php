<?php

use craft\helpers\App;

// ---------------------------------------------------------------------------
// Project variables
//
// These are pulled from .env so the CSP adapts to each project without
// editing this file. When starting a new project, make sure these are set:
//
//   PRIMARY_SITE_URL         - the site's primary domain
//   SERVD_PROJECT_SLUG       - used to build the Servd asset/transform CDN hosts
//   CSP_IMAGE_TRANSFORMS_URL - (optional) an extra image transforms host,
//                              e.g. "https://myproject.imgix.net"
//
// Project-specific services (chat widgets, embeds, analytics beyond GA, etc.)
// should be added to the relevant directives below.
// ---------------------------------------------------------------------------

$environment = strtolower(App::env('CRAFT_ENVIRONMENT') ?: '');
$isDev = $environment === 'dev';

// The site's own domain. 'self' covers it for same-origin requests, but having
// the explicit host available is useful for directives that need it.
$primarySiteUrl = App::env('PRIMARY_SITE_URL') ?: null;

// Servd asset CDN hosts, derived from the project slug.
$servdSlug = App::env('SERVD_PROJECT_SLUG');
$servdTransformsUrl = $servdSlug ? "https://{$servdSlug}.transforms.svdcdn.com" : null;
$servdFilesUrl = $servdSlug ? "https://{$servdSlug}.files.svdcdn.com" : null;

// Optional additional image transforms host (imgix, Cloudflare Images, etc.).
$imageTransformsUrl = App::env('CSP_IMAGE_TRANSFORMS_URL') ?: null;

$self = "'self'";
$devSocket = null;

if ($isDev) {
    $devServer = "$primarySiteUrl:3000";
    $self .= " $devServer";

    // Set up the WebSocket connection for Vite HMR in development.
    $devSocket = str_replace('https://', 'wss://', $devServer);
}

$CSP_DIRECTIVES = [
    'default-src' => [
        $self,
        $primarySiteUrl,
    ],
    'base-uri' => [
        "'self'",
    ],
    'object-src' => [
        "'none'",
    ],
    'form-action' => [
        "'self'",
    ],
    'frame-ancestors' => [
        "'self'",
    ],
    'connect-src' => [
        $self,
        $devSocket,
        'data:',
        'blob:',

        // Servd asset CDNs
        $servdTransformsUrl,
        $servdFilesUrl,
        $imageTransformsUrl,

        // BugHerd (uses Pusher for realtime updates)
        '*.bugherd.com',
        '*.pusher.com',
        'wss://*.pusher.com',

        // Bugsnag
        'https://sessions.bugsnag.com',

        // CookieYes
        '*.cookieyes.com',
        'cdn-cookieyes.com',

        // Google Analytics / Tag Manager
        'https://*.doubleclick.net',
        'https://analytics.google.com',
        'https://region1.google-analytics.com',
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com',

        // Google reCAPTCHA
        'https://www.google.com',
        'https://www.gstatic.com',
        'https://www.recaptcha.net',

        // Mux (video)
        'https://*.litix.io',
        'https://*.mux.com',
        'https://inferred.litix.io',
        'https://stream.mux.com',

        // Typekit
        'https://*.typekit.net',
    ],
    'font-src' => [
        $self,
        'data:',

        // Google Fonts
        'https://fonts.gstatic.com',

        // Typekit
        'https://*.typekit.net',
        'https://use.typekit.net',
    ],
    'frame-src' => [
        $self,

        // BugHerd
        '*.bugherd.com',

        // Cloudflare Turnstile
        'https://challenges.cloudflare.com',

        // Google reCAPTCHA
        'https://recaptcha.google.com',
        'https://www.google.com',
        'https://www.gstatic.com',
        'https://www.recaptcha.net',

        // Video platforms
        'https://player.mux.com',
        'https://player.vimeo.com',
        'https://www.youtube-nocookie.com',
        'https://www.youtube.com',
    ],
    'img-src' => [
        $self,
        'data:',
        'blob:',

        // Servd asset CDNs
        $servdTransformsUrl,
        $servdFilesUrl,
        $imageTransformsUrl,

        // BugHerd
        '*.bugherd.com',
        'bugherd-attachments.s3.amazonaws.com',
        'd2iiunr5ws5ch1.cloudfront.net',

        // CookieYes
        'cdn-cookieyes.com',

        // Google Analytics / Tag Manager
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com',

        // Video platforms
        'https://*.ytimg.com',
        'https://i.vimeocdn.com',
        'https://image.mux.com',
    ],
    'media-src' => [
        $self,
        'blob:',

        // Servd asset CDNs
        $servdTransformsUrl,
        $servdFilesUrl,

        // Mux (video)
        'https://*.mux.com',
        'https://image.mux.com',
        'https://stream.mux.com',
    ],
    'script-src' => [
        $self,
        'blob:',
        "'unsafe-inline'",
        // Avoid 'unsafe-eval' unless a third-party script genuinely requires it.
        // "'unsafe-eval'",

        // BugHerd (uses Pusher for realtime updates)
        '*.bugherd.com',
        '*.pusher.com',

        // Cloudflare Turnstile
        'https://challenges.cloudflare.com',

        // CookieYes
        'cdn-cookieyes.com',

        // Google Analytics / Tag Manager
        'https://ssl.google-analytics.com',
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com',

        // Google reCAPTCHA
        'https://recaptcha.google.com',
        'https://www.google.com',
        'https://www.gstatic.com',
        'https://www.recaptcha.net',
    ],
    'style-src' => [
        $self,
        "'unsafe-inline'",

        // Google Fonts
        'https://fonts.googleapis.com',

        // Typekit
        'https://p.typekit.net',
        'https://use.typekit.net',
    ],
    'worker-src' => [
        'blob:',
    ],
];

$cspDirectives = [];
foreach ($CSP_DIRECTIVES as $directive => $values) {
    $values = array_filter($values);
    if (!empty($values)) {
        $cspDirectives[] = [true, $directive, implode(' ', $values)];
    }
}

// Valueless directive, added outside the loop so it isn't filtered out.
$cspDirectives[] = [true, 'upgrade-insecure-requests', ''];

return [
    '*' => [
        // Show alerts to all users that have access to the plugin.
        // Notification emails will be sent if the scan status changes from pass to fail.
        'monitor' => false,

        // Emails (separated by commas) that should be notified of security issues.
        'notificationEmailAddresses' => '',

        // Whether to be extra critical of security issues.
        'highSecurityLevel' => true,

        // Set HTTP response headers that provide added security.
        'headerProtectionSettings' => [
           'enabled' => true,
           'headers' => [
               [true, 'Referrer-Policy', 'no-referrer-when-downgrade'],
               [true, 'Strict-Transport-Security', 'max-age=15552000'],
               [true, 'X-Content-Type-Options', 'nosniff'],
               [true, 'X-Frame-Options', 'SAMEORIGIN'],
               [true, 'X-Xss-Protection', '1; mode=block'],
           ],
        ],

        // Enables a content security policy.
        'contentSecurityPolicySettings' => [
           'enabled' => true,
           'enforce' => !$isDev,
           'header' => true,
           'directives' => $cspDirectives,
        ],

        // The number of scans to keep.
        // 'maxScans' => 50,

        // A random 32-character string that will allow calls to the plugin API.
        // 'apiKey' => '',

        // Restrict access to the control panel to the following IP addresses.
        // 'restrictControlPanelIpAddresses' => [],

        // Restrict access to the front-end to the following IP addresses.
        // 'restrictFrontEndIpAddresses' => [],

        // Whether to use basic authentication when accessing the site.
        // 'basicAuthEnabled' => false,

        // A username to use for basic authentication when accessing the site.
        // 'basicAuthUsername' => '',

        // A password to use for basic authentication when accessing the site.
        // 'basicAuthPassword' => '',

        // Add tests to disable to the array.
        // 'disabledTests' => [],
    ],
];
