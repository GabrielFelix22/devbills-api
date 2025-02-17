import type {
  CreateTransactionDTO,
  IndexTransactionsDTO,
} from '../../dtos/transactions.dto';
import type { Transaction } from '../../entities/transactions.entity';
import type { TransactionModel } from '../schemas/transactions.schema';

export class transactionsRepository {
  constructor(private model: typeof TransactionModel) {}

  async create({
    title,
    amount,
    type,
    date,
    category,
  }: Transaction): Promise<Transaction> {
    const createdTransaction = await this.model.create({
      title,
      amount,
      type,
      date,
      category,
    });

    return createdTransaction.toObject<Transaction>();
  }
  async index({
    title,
    categoryId,
    beginDate,
    endDate,
  }: IndexTransactionsDTO): Promise<Transaction[]> {
    const whereParams: Record<string, unknown> = {
      ...(title && { title: { $regex: title, $options: 'i' } }),
      ...(categoryId && { 'category._id': categoryId }),
    };

    if (beginDate && endDate) {
      whereParams.date = {
        ...(beginDate && { $gte: beginDate }),
        ...(endDate && { $lte: endDate }),
      };
    }

    const transactions = await this.model.find(whereParams);

    const transactionsMap = transactions.map((item) =>
      item.toObject<Transaction>(),
    );

    return transactionsMap;
  }
}
