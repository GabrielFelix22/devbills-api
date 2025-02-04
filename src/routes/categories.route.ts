import { Router } from 'express';

import { CategoriesController } from '../controllers/categories.cotroller';

export const categoriesRoutes = Router();

const controller = new CategoriesController();

categoriesRoutes.post('/', controller.create);
