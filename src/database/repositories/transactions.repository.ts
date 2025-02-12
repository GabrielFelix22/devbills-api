import type { CreateTransactionDTO } from '../../dtos/transactions.dto';
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
  async index(): Promise<Transaction[]> {
    const transactions = await this.model.find({});

    const transactionsMap = transactions.map((item) =>
      item.toObject<Transaction>(),
    );

    return transactionsMap;
  }
}
