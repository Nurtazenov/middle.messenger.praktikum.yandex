/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest/presets/default-esm",   // ESM поддержка для ts-jest
  testEnvironment: "jsdom",                // нужен пакет jest-environment-jsdom
  extensionsToTreatAsEsm: [".ts"],

  transformIgnorePatterns: [
  "/node_modules/(?!uuid)/"
],
};

module.exports = config;
