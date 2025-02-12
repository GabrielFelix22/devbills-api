import mongoose from 'mongoose';
import { CategorySchema } from './category.schema';

const TransactionShema = new mongoose.Schema(
  {
    title: String,
    amount: Number,
    type: String,
    date: Date,
    category: CategorySchema,
  },
  { versionKey: false },
);

export const TransactionModel = mongoose.model('Transaction', TransactionShema);
