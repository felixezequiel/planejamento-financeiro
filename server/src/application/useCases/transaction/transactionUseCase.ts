import { Transaction } from '../../../domain/bankTransaction/entities/entityTransaction';
import { TransactionService } from '../../../domain/bankTransaction/services/transaction';
import { TransactionRepository } from '../../../infrastructure/adapters/repository/transaction/transactionRepository';
import { TransactionUpdate } from './transactionUseCase.type';

export class TransactionUseCase {
  public async save(payload: Transaction[]): Promise<void> {
    const transactionRepository = new TransactionRepository();

    const transactionService = new TransactionService(transactionRepository);

    await transactionService.save(payload);
  }

  public async update(payload: TransactionUpdate): Promise<void> {
    const transactionRepository = new TransactionRepository();

    const transactionService = new TransactionService(transactionRepository);

    await transactionService.update(payload.id, payload);
  }

  public async delete(payload: { id: string }): Promise<void> {
    const transactionRepository = new TransactionRepository();

    const transactionService = new TransactionService(transactionRepository);

    await transactionService.delete(payload.id);
  }

  public async get(payload: { id: string }): Promise<Transaction> {
    const transactionRepository = new TransactionRepository();

    const transactionService = new TransactionService(transactionRepository);

    return await transactionService.get(payload.id);
  }

  public async getAll(payload: { userId: string }): Promise<Transaction[]> {
    const transactionRepository = new TransactionRepository();

    const transactionService = new TransactionService(transactionRepository);

    return await transactionService.getAll(payload.userId);
  }
}
