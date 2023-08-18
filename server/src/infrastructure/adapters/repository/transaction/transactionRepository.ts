import { ITransaction, Transaction } from '../../../../domain/bankTransaction/entities/entityTransaction';
import { IConnectionDB } from '../../adapters.type';
import { Db } from 'mongodb';
import { MongodbAdapter } from '../../mongodb/mongodbAdaper';

export class TransactionRepository implements ITransaction {
  private connectionDB: IConnectionDB<Db, Db> = new MongodbAdapter();

  public async save(payload: Transaction[]): Promise<void> {
    throw new Error('Method not implemented.');
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
