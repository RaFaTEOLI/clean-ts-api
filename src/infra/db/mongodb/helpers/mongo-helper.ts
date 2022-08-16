import { Collection, InsertOneResult, MongoClient, Document } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url);
  },

  async disconnect() {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  map(result: InsertOneResult<Document>, collection: any): any {
    return Object.assign({}, collection, { id: result.insertedId.toString() });
  },
};