module.exports = {
  "extends": [
    "airbnb-base",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  }
};
