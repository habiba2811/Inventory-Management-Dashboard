import React, { FormEvent, useState, ChangeEvent } from 'react';
import Header from '@/app/(components)/Header';
type ProductFormData = {
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
};

type CreateProductModelProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModel = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModelProps) => {
  const initialFormState = {
    name: '',
    price: 0,
    stockQuantity: 0,
    rating: 0,
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === 'price' || name === 'stockQuantity' || name === 'rating'
          ? parseFloat(value)
          : value,
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    setFormData(initialFormState);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = 'block text-sm font-medium text-gray-700';
  const inputCssStyle =
    'block w-full mb-2 p-2 border-gray-500 border-2 rounded-md';
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20" data-testid="create-product-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyle}
            required
            data-testid="create-product-name"
          />

          {/* PRICE */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={inputCssStyle}
            required
            data-testid="create-product-price"
          />
          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputCssStyle}
            required
            data-testid="create-product-stock"
          />
          {/* RATING */}
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            className={inputCssStyle}
            required
            data-testid="create-product-rating"
          />
          {/* CREATE ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            data-testid="submit-create-product"
          >
            Create
          </button>

          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
            data-testid="cancel-create-product"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModel;
