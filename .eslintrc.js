module.exports = {
  "env": {
    "browser": true
  },
  "extends": [
    "airbnb-base",
    "plugin:prettier/recommended"
  ],
  "parser": "babel-eslint",
  "rules": {
    "no-console": "off",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  },
  "env": {
    "browser": true
  }
};
