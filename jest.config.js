/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    // Protocols
    '!<rootDir>/src/presentation/controllers/authentication/signup/signup-controller-protocols.ts',
    '!<rootDir>/src/presentation/controllers/authentication/login/login-controller-protocols.ts',
    '!<rootDir>/src/presentation/controllers/survey/add-survey/add-survey-protocols.ts',
    '!<rootDir>/src/presentation/controllers/survey/load-surveys/load-surveys-protocols.ts',
    '!<rootDir>/src/presentation/middlewares/auth-middleware-protocols.ts',
    '!<rootDir>/src/presentation/protocols/index.ts',
    '!<rootDir>/src/data/usecases/add-account/db-add-account-protocols.ts',
    '!<rootDir>/src/data/usecases/authentication/db-authentication-protocols.ts',
    '!<rootDir>/src/data/usecases/add-survey/db-add-survey-protocols.ts',
    '!<rootDir>/src/data/usecases/load-account-by-token/db-load-account-by-token-protocols.ts',
    '!<rootDir>/src/data/usecases/load-surveys/db-load-surveys-protocols.ts',
  ],
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'babel',
  testEnvironment: 'node',
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src'],
  preset: '@shelf/jest-mongodb',
  // A map from regular expressions to paths to transformers
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
