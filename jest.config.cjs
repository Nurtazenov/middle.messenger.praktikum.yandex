/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest/presets/default-esm", 
  testEnvironment: "jsdom",       
  extensionsToTreatAsEsm: [".ts"],

  transformIgnorePatterns: [
  "/node_modules/(?!uuid)/"
],
};

module.exports = config;


