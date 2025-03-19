# One Craft Starter

This is a starter project for Craft 5 projects at [One Design Company](https://onedesigncompany.com).

## Requirements for Local Development

- [Docker](https://www.docker.com/)
- [DDEV >= 1.22.0](https://ddev.com/)

## Initial Startup

You can either run `odc-startup.sh` or follow the steps below:

1. Rename the `name:` in the `.ddev/config.yaml` file to match the name of your project.
1. Start DDEV by running `ddev start` from the project root.
1. Run `ddev describe` and make note of the database connection information as well as primary site url.
1. Fill out the appropriate values in the `.env` file. Sensitive data should be stored in a 1Password entry related to the project.
1. Update and Install Composer dependencies: `ddev composer update && ddev composer install`.
1. Install Craft and follow the setup instructions: `ddev craft install`.
1. Install all of our base plugins:

```
ddev craft plugin/install ckeditor && ddev craft plugin/enable ckeditor && ddev craft plugin/install seomatic && ddev craft plugin/enable seomatic && ddev craft plugin/install typogrify && ddev craft plugin/enable typogrify && ddev craft plugin/install imager-x && ddev craft plugin/enable imager-x && ddev craft plugin/install servd-asset-storage && ddev craft plugin/enable servd-asset-storage && ddev craft plugin/install hyper && ddev craft plugin/enable hyper
```

1. Remove `app/config/project/` and `app/config/license.key` from `.gitignore` and commit them to the repository.
1. Set ddev to use the NPM version set in `.nvmrc`: `ddev nvm install && ddev nvm use`
1. Install Node dependencies: `ddev npm install`.
1. Start your vite server: `ddev npm start`.
1. Fire up your site: `ddev launch`.

## Starting an existing project

1. `ddev start` to initialize the DDEV environment.
1. Copy the contents of the `.env` file from 1Password and paste it into `/app/.env`
1. Install Composer dependencies: `ddev composer install`.
1. Run `ddev import-db --file=dumpfile.sql.gz`. If you'd like to use a database GUI, see the [DDEV docs](https://ddev.readthedocs.io/en/latest/users/usage/database-management/#database-guis) for available commands.
1. Make sure you're using the correct version of Node: `ddev nvm install && ddev nvm use`
1. Install Node dependencies: `ddev npm install`.
1. Start your vite server: `ddev npm start`.
1. Fire up your site: `ddev launch`.

## Ongoing Development

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

## About Servd

This starter comes with the Servd plugin pre-installed. If the site is being hosted on [Servd](https://servd.host/) you will need to set up a new project on Servd and update the `.env` file with the appropriate values before you can set up a filesystem and assets in the Craft settings. See the [How-to: Server Configuration](https://www.notion.so/onedesigncompany/How-to-Server-Configuration-8a359e7ba9444c7098b2c6bc3af51a2d?pvs=4) document for full details on how to set up a new Servd Project, but there are two key settings in the Servd plugin to pay attention to:

- Inject CSRF tokens using AJAX: IF the site has any forms, and the site is being cached, which it should be, you'll want to enable this setting so the CSRF tokens are injected into the form.
- Image Format Autoconversion: By default this template has this setting set to "AVIF with WebP fallback". As of march of 2025, AVIF has enough browser support to be used reliably, and doesn't result in any quality/color loss like WebP can, but if for some reason assets shouldn't be converted to AVIF, make sure you update this setting.

## Requirements for Deployment Infrastructure

- [Composer >= 2](https://getcomposer.org/)
- [Node >= 20](https://nodejs.org/en/)

## Front End Tooling

- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Pre-Installed Craft Plugins

- [Servd Assets and Helpers](https://plugins.craftcms.com/servd-asset-storage)
- [CKEditor](https://plugins.craftcms.com/ckeditor)
- [SEOMatic](https://plugins.craftcms.com/seomatic)
- [Typogrify](https://plugins.craftcms.com/typogrify)
- [Imager X](https://plugins.craftcms.com/imager-x)
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
