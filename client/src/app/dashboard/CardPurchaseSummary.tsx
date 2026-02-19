import { useGetDashboardMetricsQuery } from '@/app/state/api';
import { TrendingDown, TrendingUp } from 'lucide-react';
import numeral from 'numeral';
import React, { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CardPurchaseSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const purchaseData = data?.purchaseSummary || [];
  const [timeframe, setTimeframe] = useState<'7' | '14' | '30'>('14');

  const filteredPurchaseData = useMemo(() => {
    const days = Number(timeframe);
    return purchaseData.slice(-days);
  }, [purchaseData, timeframe]);

  const lastDataPoint = filteredPurchaseData[filteredPurchaseData.length - 1] || null;

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl" data-testid="purchase-summary-card">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div className="flex items-center justify-between px-7 pt-5 mb-2">
            <h2 className="text-lg font-semibold">
              Purchase Summary
            </h2>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as '7' | '14' | '30')}
              className="text-xs border border-gray-300 rounded px-2 py-1"
              data-testid="purchase-timeframe-select"
            >
              <option value="7">Last 7</option>
              <option value="14">Last 14</option>
              <option value="30">Last 30</option>
            </select>
          </div>
          <hr />

          {/* BODY */}
          <div>
            {/* BODY HEADER */}
            <div className="mb-4 mt-7 px-7">
              <p className="text-xs text-gray-400">Purchased</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format('$0.00a')
                    : '0'}
                </p>
                {lastDataPoint && (
                  <p
                    className={`text-sm ${
                      lastDataPoint.changePercentage! >= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    } flex ml-3`}
                  >
                    {lastDataPoint.changePercentage! >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </p>
                )}
              </div>
            </div>
            {/* CHART */}
            <ResponsiveContainer width="100%" height={200} className="p-2">
              <AreaChart
                data={filteredPurchaseData}
                margin={{ top: 0, right: 0, left: -50, bottom: 45 }}
              >
                <XAxis dataKey="date" tick={false} axisLine={false} />
                <YAxis tickLine={false} tick={false} axisLine={false} />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString('en')}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });
                  }}
                />
                <Area
                  type="linear"
                  dataKey="totalPurchased"
                  stroke="#8884d8"
                  fill="#8884d8"
                  dot={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;
