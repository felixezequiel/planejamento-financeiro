import { Transaction } from '../../../domain/bankTransaction/entities/entityTransaction';
import { TransactionService } from '../../../domain/bankTransaction/services/transaction';
import { TransactionRepository } from '../../../infrastructure/adapters/repository/transaction/transactionRepository';
import { TransactionUpdate } from './transactionUseCase.type';

export class TransactionUseCase {
  private transactionRepository = new TransactionRepository();

  private transactionService = new TransactionService(this.transactionRepository);

  public async save(payload: Transaction[]): Promise<void> {
    await this.transactionService.save(payload);
  }

  public async update(payload: TransactionUpdate): Promise<void> {
    await this.transactionService.update(payload.id, payload);
  }

  public async delete(payload: { id: string }): Promise<void> {
    await this.transactionService.delete(payload.id);
  }

  public async get(payload: { id: string }): Promise<Transaction | undefined> {
    return await this.transactionService.get(payload.id);
  }

  public async getAll(payload: { userId: string }): Promise<Transaction[]> {
    return await this.transactionService.getAll(payload.userId);
  }
}
