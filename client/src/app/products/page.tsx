'use client';
import { useCreateProductMutation, useGetProductsQuery } from '@/app/state/api';
import { PlusCircleIcon, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Header from '@/app/(components)/Header';
import Rating from '@/app/(components)/Rating';
import CreateProductModel from './CreateProductModel';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setGlobalSearchTerm } from '@/app/state';

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const dispatch = useAppDispatch();
  const globalSearchTerm = useAppSelector(
    (state) => state.global.globalSearchTerm ?? ''
  );
  const [searchTerm, setSearchTerm] = useState(globalSearchTerm);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [createError, setCreateError] = useState('');

  useEffect(() => {
    setSearchTerm(globalSearchTerm);
  }, [globalSearchTerm]);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    try {
      await createProduct(productData).unwrap();
      setCreateError('');
    } catch {
      setCreateError('Unable to create product. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch data</div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full" data-testid="products-page">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search Products ..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              dispatch(setGlobalSearchTerm(e.target.value));
            }}
            data-testid="products-search-input"
          />
        </div>
      </div>
      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModelOpen(true)}
          data-testid="open-create-product-modal"
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Product
        </button>
      </div>
      {createError && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {createError}
        </div>
      )}

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
              data-testid="product-card"
            >
              <div className="flex flex-col items-center">
                <div className="mb-3 w-12 h-12 rounded-full bg-blue-100 text-blue-700 grid place-items-center text-sm font-bold">
                  {product.name.slice(0, 2).toUpperCase()}
                </div>
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock : {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/*  MODAL */}
      <CreateProductModel
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
