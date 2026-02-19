import { useMemo, useState } from 'react';
import { useGetDashboardMetricsQuery } from '@/app/state/api';
import { ShoppingBag } from 'lucide-react';
import Rating from '../(components)/Rating';
import { useAppSelector } from '../redux';

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  const globalSearchTerm = useAppSelector(
    (state) => state.global.globalSearchTerm ?? ''
  );
  const [sortBy, setSortBy] = useState<'stock' | 'price' | 'rating'>('stock');
  const [minimumRating, setMinimumRating] = useState(0);

  const products = useMemo(() => {
    const source = dashboardMetrics?.popularProducts ?? [];
    const needle = globalSearchTerm.toLowerCase();
    const filtered = source.filter(
      (product) =>
        product.rating !== undefined &&
        product.rating >= minimumRating &&
        (!needle || product.name.toLowerCase().includes(needle))
    );
    return [...filtered].sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0);
      return b.stockQuantity - a.stockQuantity;
    });
  }, [dashboardMetrics?.popularProducts, globalSearchTerm, minimumRating, sortBy]);

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16" data-testid="popular-products-card">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <div className="px-7 pt-5 pb-2">
            <h3 className="text-lg font-semibold">Popular Products</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <label className="text-xs text-gray-500">
                Sort by
                <select
                  className="ml-2 border border-gray-300 rounded px-2 py-1 text-xs"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as 'stock' | 'price' | 'rating')
                  }
                  data-testid="popular-products-sort"
                >
                  <option value="stock">Stock</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
              </label>
              <label className="text-xs text-gray-500">
                Min rating
                <select
                  className="ml-2 border border-gray-300 rounded px-2 py-1 text-xs"
                  value={minimumRating}
                  onChange={(e) => setMinimumRating(Number(e.target.value))}
                  data-testid="popular-products-min-rating"
                >
                  <option value={0}>Any</option>
                  <option value={1}>1+</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                </select>
              </label>
            </div>
          </div>
          <hr />
          <div className="overflow-auto h-full">
            {products.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
                data-testid="popular-product-item"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 grid place-items-center text-xs font-bold">
                    {product.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 text-xs">
                        ${product.price}
                      </span>
                      <span className="mx-2">|</span>
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>
                <div className="text-xs flex items-center">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(product.stockQuantity / 1000)}K Sold
                </div>
              </div>
            ))}
            {!products.length && (
              <div className="px-5 py-10 text-sm text-gray-500" data-testid="popular-products-empty">
                No products match the selected filters.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
