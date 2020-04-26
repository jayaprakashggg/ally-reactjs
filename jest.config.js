const buildEnvironment = process.env.BUILD.trim();

const envConfig = require("./config/config").fetchConfig(buildEnvironment);

module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testRegex: "(/__tests__/(.*)/[A-Za-z]+\\.test)\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFiles: ["./src/SetupTests.js"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMocks.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  collectCoverage: true,
  coverageDirectory: "reports/coverage/",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts*",
    "!<rootDir>/src/__tests__/**/*",
    "!<rootDir>/src/**/*.scss",
    "!<rootDir>/src/**/icons",
    "!<rootDir>/src/*.tsx",
    "!<rootDir>/src/reducers/CommonReducer.tsx"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "reports/junit",
        outputName: "js-test-results.xml"
      }
    ]
  ],
  globals: {
    ENV_CONFIG: envConfig,
    "ts-jest": {
      diagnostics: false
    }
  }
};
