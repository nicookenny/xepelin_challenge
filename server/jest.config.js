/**
 * @format
 * @type {import('ts-jest').JestConfigWithTsJest}
 */

module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/modules/**/*.ts',
    '!/src/modules/user/infra/http/user.ts',
    '!/src/modules/transaction/infra/http/transaction.ts',
    '!/src/modules/account/infra/http/account.ts',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}
