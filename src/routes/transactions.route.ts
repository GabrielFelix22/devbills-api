import { Router } from 'express';

import { TransactionsController } from '../controllers/transactions.controller';
import {
  createTransactionsSchema,
  getDashboardSchema,
  getFinancialEvolutionSchema,
  indexTransationSchema,
} from '../dtos/transactions.dto';
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

transactionsRoutes.get(
  '/',
  validator({
    schema: indexTransationSchema,
    type: ParamsType.QUERY,
  }),
  controller.index,
);

transactionsRoutes.get(
  '/dashboard',
  validator({
    schema: getDashboardSchema,
    type: ParamsType.QUERY,
  }),
  controller.getDashboard,
);

transactionsRoutes.get(
  '/financial-evolution',
  validator({
    schema: getFinancialEvolutionSchema,
    type: ParamsType.QUERY,
  }),
  controller.getFinancialEvolution,
);
