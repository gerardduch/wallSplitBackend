module.exports = {
  preset: '@shelf/jest-mongodb',
  rootDir: 'src',
  transform: {
    '^.+.(t|j)s$': 'ts-jest',
  },
  testRegex: '.spec.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
};
