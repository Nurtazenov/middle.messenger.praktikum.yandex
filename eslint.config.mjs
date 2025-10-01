import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
     ignores: [
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
      
      parser:tsParser,

      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint,
    },
    rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "jest/no-disabled-tests": "warn",
        "jest/no-identical-title": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-this-alias": "off",
        "no-irregular-whitespace": "off",
        "no-useless-escape": "off",
    },
},
pluginJs.configs.recommended,
];
