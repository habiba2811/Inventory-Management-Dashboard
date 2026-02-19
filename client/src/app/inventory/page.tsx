'use client';

import { useGetProductsQuery } from '@/app/state/api';
import Header from '@/app/(components)/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useAppSelector } from '@/app/redux';

const columns: GridColDef[] = [
  { field: 'productId', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Product Name', width: 200 },
  {
    field: 'price',
    headerName: 'Price',
    width: 110,
    type: 'number',
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 110,
    type: 'number',
    valueGetter: (value, row) => (row.rating ? row.rating : 'N/A'),
  },
  {
    field: 'stockQuantity',
    headerName: 'Stock Quantity',
    width: 150,
    type: 'number',
  },
];

const Inventory = () => {
  const globalSearchTerm = useAppSelector(
    (state) => state.global.globalSearchTerm ?? ''
  );
  const { data: products, isError, isLoading } = useGetProductsQuery();
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!globalSearchTerm) return products;
    const needle = globalSearchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(needle) ||
        product.productId.toLowerCase().includes(needle)
    );
  }, [products, globalSearchTerm]);

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }
  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }
  return (
    <div className="flex flex-col" data-testid="inventory-page">
      <Header name="Inventory" />
      <DataGrid
        rows={filteredProducts}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        className="bg-white shadow rounded-lg border-gray-200 mt-5 !text-gray-700"
        data-testid="inventory-grid"
      />
    </div>
  );
};
export default Inventory;
