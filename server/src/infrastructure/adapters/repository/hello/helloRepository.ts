import { IHello } from '../../../../domain/hello/hello.type';
import { IConnectionDB } from '../../adapters.type';
import { Db } from 'mongodb';
import { MongodbAdapter } from '../../mongodb/mongodbAdaper';

export class HelloRepository implements IHello {
  public connectionDB: IConnectionDB<Db, Db>;

  constructor() {
    this.connectionDB = new MongodbAdapter();
  }

  async save(payload: any) {
    return await this.connectionDB.transaction(async (db) => {
      await db.collection('hello').insertOne(payload);
    });
  }
}
