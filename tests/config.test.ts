import { getConfig } from '../api/config/config';

describe('config', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    jest.resetModules(); // This clears the module cache
  });

  it('gets the correct config', () => {
    const { data, error } = getConfig('./tests/.env');

    expect(error).toEqual('');
    expect(data?.dbName).toBe('wegonice');
    expect(data?.dbUser).toBe('niceUser');
    expect(data?.dbUserPwd).toBe('nicePassword');
    expect(data?.dbHost).toBe('0.0.0.0');
    expect(data?.dbPort).toBe('27017');
  });

  it('fails to get the config due to missing port variable', () => {
    const { data, error } = getConfig('./tests/.test.env');

    expect(error).toBeTruthy();
    expect(data).toBeNull();
  });
});
