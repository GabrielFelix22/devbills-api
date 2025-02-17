import { Router } from 'express';

import { TransactionsController } from '../controllers/transactions.controller';
import { createTransactionsSchema } from '../dtos/transactions.dto';
import { TransactionsFactory } from '../factories/transactions.factory';
import { ParamsType, validator } from '../middleware/validator.middleware';

export const transactionsRoutes = Router();

const controller = new TransactionsController(
  TransactionsFactory.getServiceInstance(),
);

transactionsRoutes.post(
  '/',
  validator({
    schema: createTransactionsSchema,
    type: ParamsType.BODY,
  }),
  controller.create,
);

transactionsRoutes.get('/', controller.index);
