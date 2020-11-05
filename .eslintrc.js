module.exports = {
  "extends": [
    "airbnb-base",
    "plugin:prettier/recommended"
  ],
  "parser": "babel-eslint",
  "rules": {
    "no-console": 2,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  },
  "env": {
    "browser": true
  }
};
