import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface salesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface purchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface expensesSummary {
  expensesSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface expenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: salesSummary[];
  purchaseSummary: purchaseSummary[];
  expensesSummary: expensesSummary[];
  expenseByCategorySummary: expenseByCategorySummary[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: 'api',
  tagTypes: ['DashboardMetrics'],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => '/dashboard',
      providesTags: ['DashboardMetrics'],
    }),
  }),
});

export const { useGetDashboardMetricsQuery } = api;
