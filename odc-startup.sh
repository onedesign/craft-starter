#!/bin/sh

# See if a project name was passed in, if not, bug
# the user about it.
if [[ $# -eq 1 ]]; then
  projectSlug=$1
  if [ "$(ls -A $(pwd)/${projectSlug} 2>/dev/null)" ]; then
       echo "Directory exists and is not empty."
       exit 1
    else
      echo "Creating project directory at $(pwd)/${projectSlug}"
      mkdir -p $projectSlug && cd $projectSlug
  fi
else
  echo "Usage:"
  echo -e '\tType "craft-base.sh [project slug]" to create a project and set the project slug'
  exit 1
fi

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
--name=${projectSlug} \

ddev start && \
ddev exec app/./craft setup/db-creds --interactive=0 --database=db --user=db --password=db --server=ddev-${projectSlug}-db --driver=mysql && \
ddev exec app/./craft install --language=en-us --interactive=0 --email=\"$adminEmail\" --username=odcadmin --password=$adminP --siteName=\"$siteName\" --siteUrl=https://${projectSlug}.ddev.site && \

# Require and install some common plugins.
ddev composer require --dev \
craftcms/generator \
nystudio107/craft-autocomplete && \

ddev composer require \
craftcms/ckeditor \
nystudio107/craft-seomatic \
nystudio107/craft-typogrify \
spacecatninja/imager-x \
servd/craft-asset-storage \
verbb/hyper && \

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

// Restart the server, build the project, and launch the site.
ddev restart && \
ddev composer update && \
ddev composer install && \
ddev craft up && \
ddev nvm install && \
ddev nvm use && \
ddev npm install && \
ddev npm run build && \
ddev describe && \

# 🚀
ddev launch
