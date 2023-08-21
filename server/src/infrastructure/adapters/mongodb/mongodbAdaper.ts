import util from 'util';
import { MongoClient, Db, ClientSession } from 'mongodb';
import { IConnectionDB, InstanceClient } from '../adapters.type';

const mongodbURI = process.env.MONGODB_URI!;

export class MongodbAdapter implements IConnectionDB<Db, Db, ClientSession> {
  public async connection<Response = void>(callback: InstanceClient<Db, Response>): Promise<Response> {
    try {
      const client = new MongoClient(mongodbURI, { replicaSet: process.env.MONGO_RS_NAME });

      await client.connect();

      const db = client.db(process.env.DB_NAME);

      const response = await callback(db).catch((e) => {
        console.error({ connectionMongo: e });

        throw new Error(e);
      });

      await client.close();

      return response;
    } catch (e) {
      const parseError = util.format(e);

      console.error(util.format(parseError));

      throw new Error(parseError);
    }
  }

  public async transaction<Response = void>(callback: InstanceClient<Db, Response, ClientSession>): Promise<Response> {
    return await new Promise(async (resolve, reject) => {
      const client = new MongoClient(mongodbURI);

      await client.connect();

      const session = client.startSession();

      session.startTransaction();

      const db = client.db(process.env.DB_NAME);
      try {
        const response = await callback(db, session);

        await session.commitTransaction();

        resolve(response);
      } catch (e) {
        await session.abortTransaction();

        reject(e);
      } finally {
        await session.endSession();

        await client.close();
      }
    });
  }
}
