"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetExpenseByCategoryQuery = exports.useGetUsersQuery = exports.useCreateProductMutation = exports.useGetProductsQuery = exports.useGetDashboardMetricsQuery = exports.api = void 0;
const react_1 = require("@reduxjs/toolkit/query/react");
const apiBaseUrl = ((_a = process.env.NEXT_PUBLIC_API_BASE_URL) === null || _a === void 0 ? void 0 : _a.trim()) || 'http://localhost:3001';
exports.api = (0, react_1.createApi)({
    baseQuery: (0, react_1.fetchBaseQuery)({ baseUrl: apiBaseUrl }),
    reducerPath: 'api',
    tagTypes: ['DashboardMetrics', 'Products', 'Users', 'Expenses'],
    endpoints: (build) => ({
        getDashboardMetrics: build.query({
            query: () => '/dashboard',
            providesTags: ['DashboardMetrics'],
        }),
        getProducts: build.query({
            query: (search) => ({
                url: '/products',
                params: search ? { search } : {},
            }),
            providesTags: ['Products'],
        }),
        createProduct: build.mutation({
            query: (NewProduct) => ({
                url: '/products',
                method: 'POST',
                body: NewProduct,
            }),
            invalidatesTags: ['Products'],
        }),
        getUsers: build.query({
            query: () => '/users',
            providesTags: ['Users'],
        }),
        getExpenseByCategory: build.query({
            query: () => '/expenses',
            providesTags: ['Expenses'],
        }),
    }),
});
exports.useGetDashboardMetricsQuery = exports.api.useGetDashboardMetricsQuery, exports.useGetProductsQuery = exports.api.useGetProductsQuery, exports.useCreateProductMutation = exports.api.useCreateProductMutation, exports.useGetUsersQuery = exports.api.useGetUsersQuery, exports.useGetExpenseByCategoryQuery = exports.api.useGetExpenseByCategoryQuery;
