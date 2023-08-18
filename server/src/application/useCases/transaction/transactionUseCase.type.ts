import { Transaction } from '../../../domain/bankTransaction/entities/entityTransaction';

export type TransactionUpdate = Transaction & { id: string };
