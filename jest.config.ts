import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    collectCoverage: true,
    collectCoverageFrom: ['./api**/*.ts'],
  };
};
