import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginJest from "eslint-plugin-jest"; 

export default [
  {
    
    files: ["**/*.{js,mjs,cjs,ts}","src/**/*.{ts,tsx}"],
    ignores: [
      "mochaSetup.js",
      "dist/**", "node_modules/**",
      "dist/**",
      "__dirname/dist/**",
      "node_modules/**"
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
          ecmaVersion: 'latest',
          sourceType: 'module',
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint,
      jest: pluginJest,
    },
    rules: {
      "no-undef": "off",
      '@typescript-eslint/no-unused-vars': ['off'],
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




