# One Craft Starter

This is a starter project for Craft 4 projects at [One Design Company](https://onedesigncompany.com).

Local development is handled by DDEV, which means that the Craft application and its related services run inside of Docker containers provided by DDEV. For consistency and in order to avoid using binaries at different versions than the application requires, it is recommended that you run all project commands from within the DDEV containers.

DDEV provides wrappers for most things you will need (including the `craft` command), so you do not actually have to `ssh` into the container to run (most) commands. Examples:

`ddev composer require foo/bar`

`ddev npm install`

`ddev npm run start`

`ddev craft project-config/apply`

`ddev craft plugin/enable imager-x`

## Requirements for Local Development

- [Docker](https://www.docker.com/)
- [DDEV](https://ddev.com/)

## Requirements for Deployment Infrastructure

- [Composer >= 2](https://getcomposer.org/)
- [Node >= 20](https://nodejs.org/en/)
- [NPM >= 9](https://www.npmjs.com/)

## Front End Dependencies

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

## Getting Started

This project is meant to run on DDEV, and that is the officially supported method for local development. You will first need to install Docker and then DDEV in order to work on this project locally.

### Initial Startup

1. Start DDEV by running `ddev start` from the project root.
2. Run `ddev describe` and make note of the database connection information as well as primary site url.
3. Fill out the appropriate values in the `.env` file. Sensitive data should be stored in a 1Password entry related to the project.
4. Import a database by running `ddev import-db --src="full/path/to/your/db.sql.gz"` (note: this command will drop any existing database).
5. Install Composer dependencies: `ddev composer install`.
6. Use the correct version of Node and install front end dependencies: `ddev nvm use && ddev npm install`.
7. Verify the front end build: `ddev npm run build`.
8. Open your site in a browser: `ddev launch`.

### Ongoing Development

1. `ddev start`
2. `ddev npm run start`
3. `ddev launch`

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
