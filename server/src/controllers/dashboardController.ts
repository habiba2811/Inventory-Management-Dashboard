import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const safeQuery = async <T>(label: string, query: Promise<T>, fallback: T) => {
      try {
        return await query;
      } catch (error) {
        console.error(`Dashboard query failed for ${label}:`, error);
        return fallback;
      }
    };

    const popularProducts = await safeQuery(
      'products',
      prisma.products.findMany({
        take: 15,
        orderBy: {
          stockQuantity: 'desc',
        },
      }),
      []
    );
    const salesSummary = await safeQuery(
      'salesSummary',
      prisma.salesSummary.findMany({
        take: 5,
        orderBy: {
          date: 'desc',
        },
      }),
      []
    );
    const purchaseSummary = await safeQuery(
      'purchaseSummary',
      prisma.purchaseSummary.findMany({
        take: 5,
        orderBy: {
          date: 'desc',
        },
      }),
      []
    );
    const expenseSummary = await safeQuery(
      'expenseSummary',
      prisma.expenseSummary.findMany({
        take: 5,
        orderBy: {
          date: 'desc',
        },
      }),
      []
    );
    const expenseByCategorySummaryRaw = await safeQuery(
      'expenseByCategory',
      prisma.expenseByCategory.findMany({
        take: 5,
        orderBy: {
          date: 'desc',
        },
      }),
      []
    );
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
      (item) => ({
        ...item,
        amount: item.amount.toString(),
      })
    );
    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    });
  } catch (error) {
    console.error('Error retrieving dashboard metrics:', error);
    res.status(500).json({ message: 'Error retrieving dashboard metrics' });
  }
};
