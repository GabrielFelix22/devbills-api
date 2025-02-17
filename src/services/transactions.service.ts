import { StatusCodes } from 'http-status-codes';
import type { CategoriesRepository } from '../database/repositories/categories.repository';
import type { transactionsRepository } from '../database/repositories/transactions.repository';
import type {
  CreateTransactionDTO,
  IndexTransactionsDTO,
} from '../dtos/transactions.dto';
import { Transaction } from '../entities/transactions.entity';
import { AppError } from '../errors/app.error';

export class TransactionsService {
  constructor(
    private transactionsRepository: transactionsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async create({
    title,
    amount,
    type,
    date,
    categoryId,
  }: CreateTransactionDTO): Promise<Transaction> {
    // precisa validar se categoria existe
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new AppError('Category does not exists.', StatusCodes.NOT_FOUND);
    }

    const transaction = new Transaction({
      title,
      type,
      date,
      category,
      amount,
    });

    const createdTransaction =
      await this.transactionsRepository.create(transaction);

    return createdTransaction;
  }

  async index(filters: IndexTransactionsDTO): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.index(filters);

    return transactions;
  }
}
