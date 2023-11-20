/**
 * @format
 * @type {import('ts-jest').JestConfigWithTsJest}
 */

module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jsdom',
  testMatch: ['**/*.spec.tsx', '**/*.spec.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '**/config.ts',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/mocks/fileMock.js',
    '\\.(scss)$': '<rootDir>/mocks/fileMock.js',
    'jest-mock-axios': 'jest-mock-axios',
  },
  transformIgnorePatterns: ['node_modules/*'],
}
