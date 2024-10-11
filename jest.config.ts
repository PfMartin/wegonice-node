import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: ['./api/**/*.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
};
