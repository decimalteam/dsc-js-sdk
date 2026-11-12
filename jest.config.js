/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\.ts$': ['ts-jest', { tsconfig: { module: 'node16', moduleResolution: 'node16', isolatedModules: true, types: ['node', 'jest'] } }],
  },
  // `npm test` runs the offline unit tests only; live tests: `npm run test:testnet` (needs DSC_TEST_MNEMONIC)
  testMatch: ['<rootDir>/test/unit/**/*.test.ts'],
};
