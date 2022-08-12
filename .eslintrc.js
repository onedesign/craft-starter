module.exports = {
  extends: ["eslint:recommended", "prettier"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
  },
  rules: {
    "no-console": "warn",
  },
  env: {
    node: true,
    browser: true,
  },
};
