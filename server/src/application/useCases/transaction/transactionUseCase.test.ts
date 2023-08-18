import { ITransaction, Transaction } from '../../../domain/bankTransaction/entities/entityTransaction';
import { TransactionService } from '../../../domain/bankTransaction/services/transaction';

// Mock implementation of the ITransaction repository
const randomAmount = () => {
  const initialAmount = 25;
  const finalAmount = 4500;

  const random = Math.random();

  const randomValue = random * (finalAmount - initialAmount) + initialAmount;

  const moneyValue = randomValue.toFixed(2);

  return parseFloat(moneyValue);
};

// Arrays de palavras para construir as frases
const substantivos = ['cachorro', 'gato', 'carro', 'casa', 'computador', 'compras', 'pagamentos', 'recebimento', 'produtos', 'serviços'];
const adjetivos = ['grande', 'pequeno', 'bonito', 'feio', 'rápido', 'lento', 'financeiro'];
const verbos = ['corre', 'pula', 'dorme', 'come', 'trabalha', 'estuda', 'realiza', 'efetua', 'recebe'];

// Função para gerar uma frase aleatória
const gerarFraseAleatoria = () => {
  // Seleciona uma palavra aleatória de cada array
  const substantivo = substantivos[Math.floor(Math.random() * substantivos.length)];
  const adjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
  const verbo = verbos[Math.floor(Math.random() * verbos.length)];

  // Constrói a frase combinando as palavras selecionadas
  const frase = `O ${substantivo} ${adjetivo} ${verbo}.`;

  return frase;
};

const mockTransaction = (): Transaction => {
  return {
    amount: randomAmount(),
    date: new Date().toISOString(),
    description: gerarFraseAleatoria(),
    installments: 1,
    intervalRecurrent: 0,
    recurrent: false,
    userId: 'user123',
  };
};

const mockRepository = {
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  get: jest.fn(),
  getAll: jest.fn(),
};

describe('TransactionService', () => {
  let transactionService: TransactionService;

  beforeEach(() => {
    transactionService = new TransactionService(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save()', () => {
    it('should call the repository.save() method with the payload', async () => {
      const payload: Transaction[] = [mockTransaction()];

      await transactionService.save(payload);

      expect(mockRepository.save).toHaveBeenCalledWith(payload);
    });
  });

  describe('update()', () => {
    it('should call the repository.update() method with the id and payload', async () => {
      const id = 'abc123';
      const payload: Transaction = mockTransaction();

      await transactionService.update(id, payload);

      expect(mockRepository.update).toHaveBeenCalledWith(id, payload);
    });
  });

  describe('delete()', () => {
    it('should call the repository.delete() method with the id', async () => {
      const id = 'abc123';

      await transactionService.delete(id);

      expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('get()', () => {
    it('should call the repository.get() method with the id', async () => {
      const id = 'abc123';
      const expectedTransaction: Transaction = mockTransaction();

      mockRepository.get.mockResolvedValue(expectedTransaction);

      const result = await transactionService.get(id);

      expect(mockRepository.get).toHaveBeenCalledWith(id);
      expect(result).toBe(expectedTransaction);
    });
  });

  describe('getAll()', () => {
    it('should call the repository.getAll() method with the userId', async () => {
      const userId = 'user123';
      const expectedTransactions: Transaction[] = [mockTransaction(), mockTransaction()];
      mockRepository.getAll.mockResolvedValue(expectedTransactions);

      const result = await transactionService.getAll(userId);

      expect(mockRepository.getAll).toHaveBeenCalledWith(userId);
      expect(result).toBe(expectedTransactions);
    });
  });
});
