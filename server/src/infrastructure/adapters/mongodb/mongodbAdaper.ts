import util from 'util';
import { MongoClient, Db } from 'mongodb';
import { IConnectionDB, InstanceClient } from '../adapters.type';

const mongodbURI = process.env.MONGODB_URI!;

export class MongodbAdapter implements IConnectionDB<Db, Db> {
  public async connection<Response = void>(callback: InstanceClient<Db, Response>): Promise<Response> {
    try {
      const client = new MongoClient(mongodbURI);

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

  public async transaction<Response = void>(callback: InstanceClient<Db, Response>): Promise<Response> {
    return await new Promise(async (resolve, reject) => {
      const client = new MongoClient(mongodbURI);

      await client.connect();

      const session = client.startSession();

      try {
        const callbackTransaction = async () => {
          const db = client.db(process.env.DB_NAME);

          const callbackResponse = await callback(db).catch((e) => {
            console.error({ processorError: e });
            throw new Error(util.format(e));
          });

          resolve(callbackResponse);
        };

        await session.withTransaction(callbackTransaction);
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
