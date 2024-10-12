import dotenv from 'dotenv';

export const getConfig = (path: string) => {
  dotenv.config({ path });

  try {
    const data = {
      dbName:
        process.env.WEGONICE_DB ||
        (() => {
          throw new Error('WEGONICE_DB variable is not set');
        })(),
      dbUser:
        process.env.WEGONICE_USER ||
        (() => {
          throw new Error('WEGONICE_USER variable is not set');
        })(),
      dbUserPwd:
        process.env.WEGONICE_PWD ||
        (() => {
          throw new Error('WEGONICE_PWD variable is not set');
        })(),
      dbHost:
        process.env.WEGONICE_HOST ||
        (() => {
          throw new Error('WEGONICE_HOST variable is not set');
        })(),
    };
    return { data, error: '' };
  } catch (err: unknown) {
    return { data: null, error: err as string };
  }
};
