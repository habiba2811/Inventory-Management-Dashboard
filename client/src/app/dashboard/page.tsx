'use client';

import CardPopularProducts from './CardPopularProducts';
import CardSalesSummary from './CardSalesSummary';
import CardPurchaseSummary from './CardPurchaseSummary';
const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pd-4 custom-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500" />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500" />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500" />
    </div>
  );
};

export default Dashboard;
