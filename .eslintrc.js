const { TRUE } = require("sass-embedded");

module.exports = {
  env:{
    node: true,
    es6: TRUE
  },
    parser: '@typescript-eslint/parser',
    plugins:'@typescript-eslint/eslint-plugin',
    extends: [
        'airbnb',
    ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  "rules":{
    "max-len": [2, 100],
    "@typescript-eslint/nounused-vars":2
  }
};








