import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: [
      "eslint.config.js",
      "stylelint.config.js",
      "loader-css.js",
      "mochaSetup.js",
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
        describe: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        global: "readonly",
      },
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "off",
    },
  },
  pluginJs.configs.recommended,
];



