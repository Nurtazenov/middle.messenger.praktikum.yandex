module.exports = {
    parser: '@typescript-eslint/parser',
    plugins:["@typescript-eslint"],
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
    ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  }
};








