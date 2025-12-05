import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

const initialState = {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
};

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async (filters = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            if (filters.category) params.append('category', filters.category);
            if (filters.search) params.append('search', filters.search);
            if (filters.minPrice) params.append('minPrice', filters.minPrice);
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

            const { data } = await axios.get(`/products?${params.toString()}`);
            return data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch products'
            );
        }
    }
);

// Async thunk for fetching single product
export const fetchProductById = createAsyncThunk(
    'products/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/products/${id}`);
            return data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch product'
            );
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all products
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Fetch single product
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCurrentProduct, clearError } = productsSlice.actions;
export default productsSlice.reducer;
