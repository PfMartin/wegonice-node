import { Db, MongoClient, ObjectId } from 'mongodb';
import { DbAuthor, DbCreateAuthor, DbPatchAuthor } from '../model/author';

import { DatabaseHandler } from '../@types/DatabaseHandler';

export interface MongodbConfig {
  dbName: string;
  host: string;
  userName: string;
  userPassword: string;
}

enum Collection {
  Authors = 'authors',
  Recipes = 'recipes',
}

export default class MongoDbHandler implements DatabaseHandler {
  private db: Db;
  private client: MongoClient;

  constructor(config: MongodbConfig) {
    this.client = new MongoClient(this.getConnectionUri(config));
    this.db = this.client.db(config.dbName);
  }

  private getConnectionUri = (config: MongodbConfig) => {
    const { dbName, host, userName, userPassword } = config;

    return `mongodb://${userName}:${userPassword}@${host}/${dbName}?authSource=${dbName}`;
  };

  public disconnect = async () => {
    this.db
    await this.client.close();
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
        createdAt: new Date(),
        updatedAt: new Date(),
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
    const { name, websiteUrl, youTubeUrl, instagramUrl } = author;

    const updateObject: Record<string, any> = {
      ...(name?.alias && { 'name.alias': name.alias }),
      ...(name?.firstName && { 'name.firstName': name.firstName }),
      ...(name?.lastName && { 'name.lastName': name.lastName }),
      ...(websiteUrl && { websiteUrl: websiteUrl }),
      ...(youTubeUrl && { youTubeUrl: youTubeUrl }),
      ...(instagramUrl && { instagramUrl: instagramUrl }),
    };

    try {
      const updateId = ObjectId.createFromHexString(id);

      const res = await this.db
        .collection<DbAuthor>(Collection.Authors)
        .updateOne(
          { _id: updateId },
          { $set: updateObject, $currentDate: { updatedAt: true } }
        );

      return { data: res.upsertedCount, error: '' };
    } catch (err: unknown) {
      return { data: null, error: err as string };
    }
  };

  deleteAuthorById = async (id: string) => {
    try {
      const deleteId = ObjectId.createFromHexString(id);

      const res = await this.db
        .collection<DbAuthor>(Collection.Authors)
        .deleteOne({ _id: deleteId });

      return { data: res.deletedCount, error: '' };
    } catch (err: unknown) {
      return { data: null, error: err as string };
    }
  };
}
