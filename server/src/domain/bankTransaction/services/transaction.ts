import { ITransaction, Transaction } from '../entities/entityTransaction';

export class TransactionService implements ITransaction {
  constructor(public repository: ITransaction) {}

  public async save(payload: Transaction[]): Promise<void> {
    await this.repository.save(payload);
  }

  public async update(id: string, payload: Transaction): Promise<void> {
    await this.repository.update(id, payload);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async get(id: string): Promise<Transaction> {
    return await this.repository.get(id);
  }

  public async getAll(userId: string): Promise<Transaction[]> {
    return await this.repository.getAll(userId);
  }
}
