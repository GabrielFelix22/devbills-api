import type { Request, Response } from 'express';

import { CategoriesRepository } from '../database/repositories/categories.repository';
import { CategoryModel } from '../database/schemas/category.schema';
import { CategoriesService } from '../services/categories.service';
export class CategoriesController {
	async create(_: Request, res: Response) {
		const repository = new CategoriesRepository(CategoryModel);
		const service = new CategoriesService(repository);

		const result = await service.create();

		return res.status(201).json(result);
	}
}
