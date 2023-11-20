/**
 * @format
 * @type {import('ts-jest').JestConfigWithTsJest}
 */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', './src/index.ts'],
}
