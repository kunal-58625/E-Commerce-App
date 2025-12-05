import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// Load user from localStorage
const userFromStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

const tokenFromStorage = localStorage.getItem('token') || null;

const initialState = {
    user: userFromStorage,
    token: tokenFromStorage,
    isAuthenticated: !!tokenFromStorage,
    loading: false,
    error: null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/users/register', userData);
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Registration failed'
            );
        }
    }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/users/login', credentials);
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            if (error.response?.data?.errors) {
                const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
                return rejectWithValue(errorMessages);
            }
            return rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);

// Async thunk for getting current user
export const getCurrentUser = createAsyncThunk(
    'auth/current',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/users/current');
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to get user'
            );
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Register
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get current user
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { ...state.user, ...action.payload };
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
