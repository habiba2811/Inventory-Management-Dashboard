'use client';

import {
  ExpenseByCategorySummary,
  useGetExpenseByCategoryQuery,
} from '@/app/state/api';
import { useMemo, useState } from 'react';
import Header from '@/app/(components)/Header';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

type AggregatedDataItem = {
  name: string;
  color: string;
  amount: number;
};

type AggregatedData = {
  [category: string]: AggregatedDataItem;
};

const categoryPalette = ['#2563EB', '#0891B2', '#16A34A', '#D97706', '#DB2777'];

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpenseByCategoryQuery();
  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === 'All' || data.category === selectedCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);
        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount);
        if (!acc[data.category]) {
          acc[data.category] = {
            name: data.category,
            amount: 0,
            color:
              categoryPalette[Object.keys(acc).length % categoryPalette.length],
          };
        }
        acc[data.category].amount += amount;
        return acc;
      }, {});

    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);

  const categories = useMemo(
    () => ['All', ...new Set(expenses.map((item) => item.category))],
    [expenses]
  );

  const classNames = {
    label: 'block text-sm font-medium text-gray-700',
    selectInput:
      'mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md',
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !expensesData) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch expenses
      </div>
    );
  }

  return (
    <div data-testid="expenses-page">
      {/* HEADER */}
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of expenses over time.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter by Category and Date
          </h3>
          <div className="space-y-4">
            {/* CATEGORY */}
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                id="category"
                name="category"
                className={classNames.selectInput}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                data-testid="expenses-category-filter"
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            {/* START DATE */}
            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                className={classNames.selectInput}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                data-testid="expenses-start-date-filter"
              />
            </div>
            {/* END DATE */}
            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                className={classNames.selectInput}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                data-testid="expenses-end-date-filter"
              />
            </div>
            <button
              className="w-full bg-gray-800 text-white rounded-md py-2 text-sm hover:bg-gray-900"
              onClick={() => {
                setSelectedCategory('All');
                setStartDate('');
                setEndDate('');
                setActiveIndex(0);
              }}
              data-testid="expenses-reset-filters"
            >
              Reset Filters
            </button>
          </div>
        </div>
        {/* PIE CHART */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey="amount"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map(
                  (entry: AggregatedDataItem, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex ? 'rgb(29, 78, 216)' : entry.color
                      }
                      data-testid={`expenses-slice-${index}`}
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 border-t pt-3">
            <p className="text-sm font-semibold text-gray-700 mb-2">Category Totals</p>
            <ul className="space-y-1" data-testid="expenses-category-totals">
              {aggregatedData.map((item) => (
                <li key={item.name} className="flex justify-between text-sm">
                  <button
                    className="text-left text-blue-700 hover:underline"
                    onClick={() => setSelectedCategory(item.name)}
                    data-testid={`expenses-category-chip-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.name}
                  </button>
                  <span className="font-medium">${item.amount.toLocaleString('en-US')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
