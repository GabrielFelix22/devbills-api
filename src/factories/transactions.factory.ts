import { CategoriesRepository } from '../database/repositories/categories.repository';
import { transactionsRepository } from '../database/repositories/transactions.repository';
import { CategoryModel } from '../database/schemas/category.schema';
import { TransactionModel } from '../database/schemas/transactions.schema';
import { TransactionsService } from '../services/transactions.service';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class TransactionsFactory {
  private static transactionsService: TransactionsService;

  static getServiceInstance() {
    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    if (this.transactionsService) {
      // biome-ignore lint/complexity/noThisInStatic: <explanation>
      return this.transactionsService;
    }

    const repository = new transactionsRepository(TransactionModel);
    const categoriesRepository = new CategoriesRepository(CategoryModel);
    const service = new TransactionsService(repository, categoriesRepository);

    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    this.transactionsService = service;

    return service;
  }
}
