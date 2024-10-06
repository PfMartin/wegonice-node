import { Db, MongoClient, ObjectId } from 'mongodb';
import { DbAuthor, DbCreateAuthor, DbPatchAuthor } from '../model/author';

import { DatabaseHandler } from '../@types/DatabaseHandler';

export interface MongodbConfig {
  dbName: string;
  host: string;
  port: number;
  username: string;
  userPassword: string;
}

enum Collection {
  Authors = 'authors',
  Recipes = 'recipes',
}

export default class MongoDbHandler implements DatabaseHandler {
  private db: Db;

  constructor(config: MongodbConfig) {
    const client = new MongoClient(this.getConnectionUri(config));
    this.db = client.db(config.dbName);
  }

  private getConnectionUri = (config: MongodbConfig) => {
    const { dbName, host, port, username, userPassword } = config;

    return `mongodb://${username}:${userPassword}@${host}:${port}/${dbName}?authSource=${dbName}`;
  };

  getAllAuthors = async () => {
    try {
      const res: DbAuthor[] = await this.db
        .collection<DbAuthor>(Collection.Authors)
        .find()
        .toArray();

      const data = res.map((author) => ({
        ...author,
        _id: author._id.toHexString(),
      }));

      return { data, error: '' };
    } catch (err: unknown) {
      return { data: null, error: err as string };
    }
  };

  getAuthorById = async (id: string) => {
    try {
      const objectId = ObjectId.createFromHexString(id);

      const res: DbAuthor | null = await this.db
        .collection<DbAuthor>(Collection.Authors)
        .findOne({ _id: objectId });

      if (!res) {
        return { data: null, error: `Failed to find author with id = ${id}` };
      }

      const data = {
        ...res,
        _id: res._id.toHexString(),
      };

      return { data, error: '' };
    } catch (err: unknown) {
      return { data: null, error: err as string };
    }
  };

  createAuthor = async (author: DbCreateAuthor) => {
    try {
      const id = new ObjectId();

      const dbAuthor = {
        ...author,
        _id: id,
      };

      const res = await this.db
        .collection<DbAuthor>(Collection.Authors)
        .insertOne(dbAuthor);

      return { data: res.insertedId.toHexString(), error: '' };
    } catch (err: unknown) {
      return { data: null, error: err as string };
    }
  };

  patchAuthorById = async (id: string, author: DbPatchAuthor) => {
    return { data: 'hello', error: '' };
  };

  deleteAuthorById = async () => {
    return { data: 'hello', error: '' };
  };
}
