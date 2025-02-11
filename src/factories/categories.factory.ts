import { CategoriesRepository } from '../database/repositories/categories.repository';
import { CategoryModel } from '../database/schemas/category.schema';
import { CategoriesService } from '../services/categories.service';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class CategoriesFactory {
  private static categoriesService: CategoriesService;

  static getServiceInstance() {
    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    if (this.categoriesService) {
      // biome-ignore lint/complexity/noThisInStatic: <explanation>
      return this.categoriesService;
    }

    const repository = new CategoriesRepository(CategoryModel);
    const service = new CategoriesService(repository);

    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    this.categoriesService = service;

    return service;
  }
}
