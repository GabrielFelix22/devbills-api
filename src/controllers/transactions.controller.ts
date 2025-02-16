import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { CreateTransactionDTO } from '../dtos/transactions.dto';
import type { TransactionsService } from '../services/transactions.service';

export class TransactionsController {
  constructor(private TransactionsService: TransactionsService) {}

  create = async (
    req: Request<unknown, unknown, CreateTransactionDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title, amount, categoryId, date, type } = req.body;

      const result = await this.TransactionsService.create({
        title,
        amount,
        categoryId,
        date,
        type,
      });

      return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  };
}
