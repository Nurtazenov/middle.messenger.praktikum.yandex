/* eslint-disable no-undef */
module.exports = {
    transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};


