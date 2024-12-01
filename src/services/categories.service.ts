import { Category } from '../entities/category.entity';

export class CategoriesService {
	async create(): Promise<Category> {
		const category = new Category({
			title: 'Exemple Category',
			color: '#0F2A1D',
		});

		return category;
	}
}
