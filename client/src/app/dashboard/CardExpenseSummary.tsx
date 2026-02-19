import {
  ExpenseByCategorySummary,
  useGetDashboardMetricsQuery,
} from '@/app/state/api';
import { TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

type ExpenseSums = {
  [category: string]: number;
};

const colors = ['#00C49F', '#0088FE', '#FFBB28'];

const CardExpenseSummary = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  const [viewMode, setViewMode] = useState<'chart' | 'list'>('chart');

  const expenseSummary = dashboardMetrics?.expenseSummary[0];

  const expenseByCategorySummary =
    dashboardMetrics?.expenseByCategorySummary || [];

  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
      const category = item.category + ' Expenses';
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const totalExpenses = expenseCategories.reduce(
    (acc, category: { value: number }) => acc + category.value,
    0
  );
  const formattedTotalExpenses = totalExpenses.toFixed(2);

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between" data-testid="expense-summary-card">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div className="flex items-center justify-between px-7 pt-5 mb-2">
            <h2 className="text-lg font-semibold">
              Expense Summary
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('chart')}
                className={`text-xs px-2 py-1 rounded border ${
                  viewMode === 'chart'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300'
                }`}
                data-testid="expense-view-chart"
              >
                Chart
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`text-xs px-2 py-1 rounded border ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300'
                }`}
                data-testid="expense-view-list"
              >
                List
              </button>
            </div>
          </div>
          <hr />
          {/* BODY */}
          <div className="xl:flex justify-between pr-7" data-testid="expense-summary-body">
            {viewMode === 'chart' ? (
              <>
                {/* CHART */}
                <div className="relative basis-3/5">
                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        innerRadius={50}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                    <span className="font-bold text-xl">
                      ${formattedTotalExpenses}
                    </span>
                  </div>
                </div>
                {/* LABELS */}
                <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
                  {expenseCategories.map((entry, index) => (
                    <li
                      key={`legend-${index}`}
                      className="flex items-center text-xs"
                    >
                      <span
                        className="mr-2 w-3 h-3 rounded-full"
                        style={{ backgroundColor: colors[index % colors.length] }}
                      ></span>
                      {entry.name}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <ul className="w-full px-7 py-4 space-y-2" data-testid="expense-summary-list">
                {expenseCategories.map((entry, index) => (
                  <li key={entry.name} className="flex justify-between text-sm border-b pb-1">
                    <span className="text-gray-600">{entry.name}</span>
                    <span className="font-semibold text-gray-800" data-testid={`expense-list-item-${index}`}>
                      ${entry.value.toLocaleString('en-US')}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* FOOTER */}
          <div>
            <hr />
            {expenseSummary && (
              <div className="mt-3 flex justify-between items-center px-7 mb-4">
                <div className="pt-2">
                  <p className="text-sm">
                    Average:{' '}
                    <span className="font-semibold">
                      ${expenseSummary.totalExpenses.toFixed(2)}
                    </span>
                  </p>
                </div>
                <span className="flex items-center mt-2">
                  <TrendingUp className="mr-2 text-green-500" />
                  30%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary;
