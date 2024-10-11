import { getConfig } from '../api/config/config';

describe('config', () => {
  it('gets the correct config', () => {
    const { data, error } = getConfig('./.env');

    expect(error).toEqual('');
    expect(data?.dbName).toBeTruthy();
    expect(data?.dbUser).toBeTruthy();
    expect(data?.dbUserPwd).toBeTruthy();
    expect(data?.dbHost).toBeTruthy();
    expect(data?.dbPort).toBeTruthy();
  });
});
