import { Collection, InsertOneResult, MongoClient, Document } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
  },

  async disconnect() {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  map(result: InsertOneResult<Document>, collection: any): any {
    const { _id, ...collectionWithoutId } = collection;
    return Object.assign({}, collectionWithoutId, {
      id: result.insertedId.toString(),
    });
  },
};
