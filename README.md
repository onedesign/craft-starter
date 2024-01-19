# One Craft Starter

This is a starter project for Craft 4 projects at [One Design Company](https://onedesigncompany.com).

## Requirements for Local Development

- [Docker](https://www.docker.com/)
- [DDEV >= 1.22.0](https://ddev.com/)

### Initial Startup

1. Rename the `name:` in the `.ddev/config.yaml` file to match the name of your project.
1. Start DDEV by running `ddev start` from the project root.
1. Run `ddev describe` and make note of the database connection information as well as primary site url.
1. Fill out the appropriate values in the `.env` file. Sensitive data should be stored in a 1Password entry related to the project.
1. Install Composer dependencies: `ddev composer install`.
1. Create an application key: `ddev craft setup/app-id`
1. Set a security key in your `.env` by typing: `ddev craft setup/security-key`
1. Use the correct version of Node and install front end dependencies: `ddev nvm use && ddev npm install`.
1. Install Craft: `ddev craft install`
1. (If importing an existing project) - Run `ddev launch -p` to fire up PHPMyAdmin and import a database.
1. Start your vite server: `ddev npm start`.
1. Fire up your site: `ddev launch`.

### Ongoing Development

1. `ddev start`
2. `ddev npm run start`
3. `ddev launch`

### About DDEV

Local development is handled by DDEV, which means that the Craft application and its related services run inside of Docker containers provided by DDEV. For consistency and in order to avoid using binaries at different versions than the application requires, it is recommended that you run all project commands from within the DDEV containers.

DDEV provides wrappers for most things you will need (including the `craft` command), so you do not actually have to `ssh` into the container to run (most) commands. Examples:

`ddev composer require foo/bar`

`ddev npm install`

`ddev npm run start`

`ddev craft project-config/apply`

`ddev craft plugin/enable imager-x`

## Requirements for Deployment Infrastructure

- [Composer >= 2](https://getcomposer.org/)
- [Node >= 20](https://nodejs.org/en/)

## Front End Tooling

- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Pre-Installed Craft Plugins

- [Servd Assets and Helpers](https://plugins.craftcms.com/servd-asset-storage)
- [CKEditor](https://plugins.craftcms.com/ckeditor)
- [Twig Perversion](https://plugins.craftcms.com/twig-perversion)
- [SEOMatic](https://plugins.craftcms.com/seomatic)
- [Typogrify](https://plugins.craftcms.com/typogrify)
- [Imager X](https://plugins.craftcms.com/imager-x)
- [NEO](https://plugins.craftcms.com/neo)
- [Hyper](https://plugins.craftcms.com/hyper)

### Production Configuration

This project template comes with an `.htaccess` file that contains updates and optimizations for One Design Craft CMS projects. Once you have a production domain for you project, go into this file and update all the places where `yourproject.com` appears with the actual production domain.

## Common Pitfalls

### The Vite Server Doesn't Work

Vite uses `esbuild` under the hood, and that compiles differently based on the system architecture of where it was installed. If you ran `npm install` outside of DDEV, then `ddev npm run start` will not work, because the container expects to be working with a version of `esbuild` that was installed from within the container.

If you have this issue, try `rm -rf node_modules` and then `ddev npm install`.

If you did initially run `ddev npm install` and your Vite server isn't working, be sure you're actually running `ddev npm run start` and not simply `npm run start`, as the project is configured to expect the Vite dev server to be running from with DDEV.

### Static Assets

Because of the way that Vite resolves references to static assets, static assets referenced in your CSS or templates need to have an absolute URL with the `static/` directory as the root. Examples:

A template image: `<img src="{{ vite.url('/images/sprout.jpg') }}" alt="">`

A font file: `src: url('/fonts/fira-code-v21-latin-regular.woff2') format('woff2');`

### Composer Packages Requiring Authentication

If you are referencing a Composer package that requires authentication, for example, a package hosted on Repman, you may need to authenticate while running `ddev composer install`. In a normal scenario, you would add an auth token to your global Composer configuration. With DDEV, you will need to add this token inside of the running web container.

`ddev ssh`

`composer config --global --auth http-basic.onedesign.repo.repman.io token [your-token]`

`exit`

Doing that will allow `ddev composer install` to succeed. The downside is that the container's global Composer config is ephemeral, so if you need to authenticate again for any reason, you will have to repeat the steps above.
