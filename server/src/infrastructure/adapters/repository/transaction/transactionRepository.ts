import { ITransaction, Transaction } from '../../../../domain/bankTransaction/entities/entityTransaction';
import { IConnectionDB } from '../../adapters.type';
import { ClientSession, Db, ObjectId } from 'mongodb';
import { MongodbAdapter } from '../../mongodb/mongodbAdaper';

export class TransactionRepository implements ITransaction {
  private static COLLECTION_NAME = 'transactions';

  private connectionDB: IConnectionDB<Db, Db, ClientSession> = new MongodbAdapter();

  public async save(payload: Transaction[]): Promise<void> {
    await this.connectionDB.transaction(async (transaction, session) => {
      const collection = transaction.collection<Transaction>(TransactionRepository.COLLECTION_NAME);

      const itensInserts = payload.map((item) => {
        if (item._id) {
          item._id = new ObjectId(item._id) as unknown as string;
        }

        return item;
      });

      await collection.insertMany(itensInserts, { session });
    });
  }

  public async update(id: string, payload: Transaction): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async get(id: string): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }

  public async getAll(userId: string): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }
}
