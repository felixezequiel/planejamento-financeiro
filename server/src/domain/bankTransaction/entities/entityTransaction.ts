export interface Transaction {
  _id?: string;
  date: string;
  amount: number;
  description: string;
  installments: number;
  recurrent: boolean;
  intervalRecurrent: number;
  userId: string;
}

export interface ITransaction {
  save(payload: Transaction[]): Promise<void>;

  update(id: string, payload: Transaction): Promise<void>;

  delete(id: string): Promise<void>;

  get(id: string): Promise<Transaction>;

  getAll(userId: string): Promise<Transaction[]>;
}
