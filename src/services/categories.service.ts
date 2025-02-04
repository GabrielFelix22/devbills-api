import { Category } from '../entities/category.entity';

export class CategoriesService {
	async create(): Promise<Category> {
		const category = new Category({
			title: 'Test Category',
			color: '#FF0000',
		});

		return category;
	}
}
