module.exports = {
  "extends": [
    "airbnb-base",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "no-console": "off",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  }
};
