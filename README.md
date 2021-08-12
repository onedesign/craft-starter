# ODC Craft Starter

This is a starter project for Craft 3 projects at [One Design Company](https://onedesigncompany.com).

## Requirements
- [Composer >= 2](https://getcomposer.org)
- [Node - Long Term Stable (LTS)](https://nodejs.org/en/)

## Getting Started

### Create a new Repo
This repo is a [Template Repo](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/creating-a-repository-from-a-template#about-repository-templates) which means you can use it to quickly and easily create a new project by clicking the "Use this template" button visible on the main repo page. 

That button will ask you select an owner (onedesign) and a name for the repository (client name). You can also select a visibility (private 99% of the time). This will create a new repo using this repo as a base. Once the repo has been created, you can clone it onto your system like any other repo. 


### Install Dependencies
After you've cloned the repo, you'll want to run the following commands from the root of the repo:

```sh
# Run composer install using ./app as the directory
composer install -d app

# Get the correct version of node
nvm use

# Install node dependencies
npm install 
```

### Setup Webserver

We primarily recommend using [Homestead](https://laravel.com/docs/8.x/homestead) as your webserver, but [Nitro](https://getnitro.sh/) or [MAMP](https://www.mamp.info/en/mamp-pro/mac/) are also good options. Setting up your webserver is out of the scope of this repo. If you need help getting your repo set up, reach out to another developer on the team, and we'll get you up and running. 

After you have your server up and running, you'll also want to add a database table for your new project. Again, instructions on this vary depending on which server you're using. If you need help, reach out to another developer, and we'll help you out. 

### Configuration
Now that you have your repo cloned, dependencies installed and server running, it's time to configure Craft. 

If you're using Homestead, `ssh` into the server, navigate to your project and run:
```
$ ./craft setup
```

This command will ask you question about your environment (mysql vs. postgres, databse user, database password, etc.), basically it will create a `.env` file with your answers which is why you're going to want to have your database created beforehand. Otherwise, it will complain that it can't connect to the database. After asking all the .env questions, it will ask if you'd like to install Craft now or later, feel free to do whichever you'd like.

If you don't want to use the setup command, just copy the `.env.example` file to a `.env` file and replace the values with your local environment configuration. Just be sure to add a random string to the `SECURITY_KEY` variable.

**NOTE:**
If you're using MAMP as your local server of choice, the above command won't work. You have two options. First, you can copy the `.env.example` file in the repo and edit values on your own (be sure to generate a security key) OR you can point the command at your active version of PHP and run it that way. On macOS that looks something like
```
$ /Applications/MAMP/bin/php/{ACTIVE_PHP_VERSION}/bin/php ./craft setup
```
Be sure to replace `ACTIVE_PHP_VERSION` in the above with the version MAMP is currently using. At the time of writing it's probably either `php7.1.12` or `php7.2.1`

### Generating a Security Key
To generate a new security key, use the Craft console command.
```sh
./craft setup/security-key
```
That will output the command to your terminal and replace the value in your .env file. 

## Front End
On the front end, we have a [gulp](https://gulpjs.com/) build process that will compile your CSS, bundle your JS and _hopefully_ handle all the boring stuff you don't want to deal with.

To kick off this build use one of the two main commands:
```sh
# Development
npm run start

# Production build (no dev server)
npm run build
```

## Included Plugins:
- [Craft 3 Asset Rev](https://github.com/clubstudioltd/craft3-asset-rev)
- [AWS S3 Asset Source](https://github.com/craftcms/aws-s3)
- [Typogrify](https://github.com/nystudio107/craft-typogrify)
- [Environment Label](https://github.com/TopShelfCraft/Environment-Label)
- [Redactor](https://plugins.craftcms.com/redactor)
- [SEOMatic](https://plugins.craftcms.com/seomatic)
- [Blitz](https://plugins.craftcms.com/blitz)

## Environment variables

All ENV vars are documented within `./app/.env.example`. When adding a new ENV var, be sure to add it to this file with proper comments and documentation.

## Tech Specs

Craft is a self-hosted PHP application. It can connect to MySQL and PostgreSQL for content storage. See [Server Requirements](https://craftcms.com/docs/3.x/requirements.html) for more details.

## Popular Resources

- **[Tutorial](https://craftcms.com/docs/getting-started-tutorial/)** – Get set up and learn the basics.
- **[Documentation](https://craftcms.com/docs/)** – Read the official docs.
- **[Knowledge Base](https://craftcms.com/knowledge-base)** – Find answers to common problems.
- **[#craftcms](https://twitter.com/hashtag/craftcms)** – See the latest tweets about Craft.
- **[Discord](https://craftcms.com/discord)** – Meet the community.
- **[Stack Exchange](http://craftcms.stackexchange.com/)** – Get help and help others.
- **[CraftQuest](https://craftquest.io/)** – Watch unlimited video lessons and courses.
- **[Craft Link List](http://craftlinklist.com/)** – Stay in-the-know.
- **[nystudio107 Blog](https://nystudio107.com/blog)** – Learn Craft and modern web development.
