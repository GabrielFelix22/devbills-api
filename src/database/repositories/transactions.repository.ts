import type {
  CreateTransactionDTO,
  IndexTransactionsDTO,
} from '../../dtos/transactions.dto';
import type { GetDashboardDTO } from '../../dtos/transactions.dto';
import type { Balance } from '../../entities/balance.entity';
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

    const transactions = await this.model.find(whereParams, undefined, {
      sort: { date: -1 },
    });

    const transactionsMap = transactions.map((item) =>
      item.toObject<Transaction>(),
    );

    return transactionsMap;
  }

  async getBalance({ beginDate, endDate }: GetDashboardDTO): Promise<Balance> {
    const aggregate = this.model.aggregate<Balance>();

    if (beginDate || endDate) {
      aggregate.match({
        date: {
          ...(beginDate && { $gte: beginDate }),
          ...(endDate && { $lte: endDate }),
        },
      });
    }

    const [result] = await aggregate
      .project({
        _id: 0,
        income: {
          $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0],
        },
        expense: {
          $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0],
        },
      })
      .group({
        _id: null,
        incomes: {
          $sum: '$income',
        },
        expenses: {
          $sum: '$expense',
        },
      })
      .addFields({
        balance: {
          $subtract: ['$incomes', '$expenses'],
        },
      });

    return result;
  }
}
