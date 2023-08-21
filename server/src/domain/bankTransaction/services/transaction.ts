import util from 'util';
import moment from 'moment';
import { ITransaction, Transaction } from '../entities/entityTransaction';

export class TransactionService implements ITransaction {
  constructor(public repository: ITransaction) {}

  private validadeDateFields(payload: Transaction, target: number): void {
    const dateValid = moment(payload.date).isValid();

    if (!dateValid) {
      throw new Error(`Iten ${target} with invalid date`);
    }
  }

  public async save(payload: Transaction[]): Promise<void> {
    try {
      payload.forEach((transaction, index) => {
        this.validadeDateFields(transaction, index);
      });

      await this.repository.save(payload);
    } catch (e) {
      throw new Error(util.format(e));
    }
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
