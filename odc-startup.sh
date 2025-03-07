#!/bin/sh

# Get the project slug from the directory name.
projectSlug=${PWD##*/}

# Set the site name and admin email for Craft.
while true; do
    read -r -p "What do you want to call this project? (this will become the Site Name) `echo $'\n> '`" siteName
    if [[ -z $siteName ]]; then
       echo "Site Name is required."
       continue
    fi
    echo "$siteName"
    break
done

read -r -p "What email address should be used for the admin? (default: dev@onedesigncompany.com) `echo $'\n> '`" adminEmail
adminEmail=${adminEmail:-dev\@onedesigncompany.com}
echo "$adminEmail"

read -r -p "What username should be used for the admin? (default: odcadmin) `echo $'\n> '`" adminU
adminU=${adminU:-odcadmin}
echo "$adminU"

while true; do
    read -s -p "Please choose an admin password (must be at least 6 characters). `echo $'\n> '`" adminP
    if [[ -z $adminP ]]; then
       echo "Password is required."
       continue
    fi
    break
done

# Initialize DDEV and install Craft
ddev config \
--project-name=${projectSlug} \

ddev start && \
# install composer
ddev composer update && \
ddev composer install && \
ddev exec app/./craft install --language=en-us --interactive=0 --email=\"$adminEmail\" --username=\"$adminU\" --password=$adminP --siteName=\"$siteName\" --siteUrl=https://${projectSlug}.ddev.site && \
dde exec app/./craft php project-config/set system.edition pro && \

# Install and enable plugins
ddev craft plugin/install ckeditor && \
ddev craft plugin/enable ckeditor && \
ddev craft plugin/install seomatic && \
ddev craft plugin/enable seomatic && \
ddev craft plugin/install typogrify && \
ddev craft plugin/enable typogrify && \
ddev craft plugin/install imager-x && \
ddev craft plugin/enable imager-x && \
ddev craft plugin/install servd-asset-storage && \
ddev craft plugin/enable servd-asset-storage && \
ddev craft plugin/install hyper && \
ddev craft plugin/enable hyper && \

# remove "app/config/project/" and "app/config/license.key" from .gitignore
echo "Removing 'app/config/project/' and 'app/config/license.key' from .gitignore" && \
sed -i '' '/app\/config\/project\//d' .gitignore && \
sed -i '' '/app\/config\/license.key/d' .gitignore && \

# Restart the server, build the project, and launch the site.
echo "Restarting and building the project..." && \
ddev restart && \
ddev craft up && \
ddev nvm install && \
ddev nvm use && \
ddev npm install && \
ddev npm run build && \
ddev describe && \

# 🚀
ddev launch
