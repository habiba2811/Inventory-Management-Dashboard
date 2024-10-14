import { ExpenseByCategorySummary } from './../../../client/src/app/state/api';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getExpenseByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenseByCategoryRaw = await prisma.expenseByCategory.findMany({
      orderBy: {
        date: 'desc',
      },
    });
    const ExpenseByCategorySummary = expenseByCategoryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    res.json(ExpenseByCategorySummary);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving expense by category' });
  }
};
