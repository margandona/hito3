module.exports = {
    testEnvironment: "node",
    coverageDirectory: "coverage",
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.js",
      "!src/server.js"
    ],
    testMatch: ["**/tests/**/*.test.js"],
    verbose: true,
  };
  