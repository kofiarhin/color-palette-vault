module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>"], // only look inside server
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  testPathIgnorePatterns: [
    "<rootDir>/client/", // ignore client tests
    "/node_modules/",
  ],
};
