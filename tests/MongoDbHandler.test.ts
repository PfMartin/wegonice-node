import { Author, DbCreateAuthor } from '../api/model/author';

import MongoDbHandler from '../api/database/MongoDbHandler';
import { getConfig } from '../api/config/config';
import { getRandomAuthor } from './dummyData/author';

const getDbHandler = () => {
  const { data } = getConfig('.env');

  if (!data) {
    throw new Error('Test failed: Got invalid config');
  }

  const { dbName, dbUser, dbUserPwd, dbHost } = data;

  const dbConfig = {
    dbName,
    host: dbHost,
    userName: dbUser,
    userPassword: dbUserPwd,
  };

  return new MongoDbHandler(dbConfig);
};

const getAuthorById = async (dbHandler: MongoDbHandler, id: string) => {
  const { data, error } = await dbHandler.getAuthorById(id);

  if (error) {
    throw new Error('Test failed: Error while getting author by Id');
  }

  if (!data) {
    throw new Error(`Test failed: Could not find author with id: ${id}`);
  }

  expect(data._id).toEqual(id);

  return data;
};

const expectAuthorsToBeEqual = (
  dbAuthor: Author,
  createAuthor: DbCreateAuthor
) => {
  expect(dbAuthor.name).toEqual(createAuthor.name);

  expect(dbAuthor.websiteUrl).toEqual(createAuthor.websiteUrl);
  expect(dbAuthor.youTubeUrl).toEqual(createAuthor.youTubeUrl);
  expect(dbAuthor.instagramUrl).toEqual(createAuthor.instagramUrl);

  const start = new Date().getTime() - 1000;
  const end = new Date().getTime();

  const createdAt = new Date(dbAuthor.createdAt).getTime();
  const updatedAt = new Date(dbAuthor.updatedAt).getTime();

  expect(start <= createdAt && createdAt <= end).toEqual(true);
  expect(start <= updatedAt && updatedAt <= end).toEqual(true);
};

describe('MongoDbHandler', () => {
  const dbHandler = getDbHandler();

  afterAll(async () => {
    await dbHandler.disconnect();
  });

  it('creates a new author', async () => {
    expect(dbHandler).not.toBeNull();

    const authorToCreate = getRandomAuthor();

    const { data, error } = await dbHandler.createAuthor(authorToCreate);
    expect(error).toEqual('');

    if (!data) {
      throw new Error('Test failed: Could not create author');
    }

    const gotAuthor = await getAuthorById(dbHandler, data);

    expect(gotAuthor).toBeTruthy();
    expectAuthorsToBeEqual(gotAuthor, authorToCreate);
  });
});
