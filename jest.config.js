/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  // Temp roots: ["<rootDir>/src"],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['dist', '.d.ts', '.js'],
  resolver: 'jest-ts-webcompat-resolver',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/assetsMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/main.tsx',
    '<rootDir>/src/redux/thunks.ts',
    '<rootDir>/src/components/editform/editform.tsx',
    '<rootDir>/src/components/filter/filter.tsx',
    '<rootDir>/src/components/paginate/paginate.tsx',
    '<rootDir>/src/vite-env.d.ts',
    '<rootDir>/src/components/app/app.tsx',

    '<rootDir>/src/config.ts',
  ],
};
