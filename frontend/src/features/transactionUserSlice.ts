import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface TransactionUser {
    _id: string;
    username: string;
    createdAt?: string;
    updatedAt?: string;
}

interface TransactionUserState {
    loading: boolean;
    error: string | null;
}

const initialState: TransactionUserState = {
    loading: false,
    error: null,
};

// Async thunk for creating a new Transaction user
export const createTransactionUser = createAsyncThunk<
    TransactionUser, // Return type on success
    { username: string }, // Parameter type
    { rejectValue: string }
>(
    'transactionUsers/createTransactionUser',
    async ({ username }, thunkAPI) => {
        try {
            const response = await axios.post('/api/transactionUser', { username });

            return response.data; // Assumes API returns the created TransactionUser object
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message || error.message
                );
            } else {
                return thunkAPI.rejectWithValue("An unknown error occurred.");
            }
        }
    }
);

// Async thunk for searching Transaction users by name
export const searchTransactionUsers = createAsyncThunk<
    TransactionUser[], // Return type on success
    { username: string }, // Parameter type
    { rejectValue: string }
>(
    'transactionUsers/searchTransactionUsers',
    async ({ username }, thunkAPI) => {
        try {
            const response = await axios.get('/api/transactionUser/search', {
                params: { username },
            });
            return response.data; // Assumes API returns an array of TransactionUser objects
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message || error.message
                );
            } else {
                return thunkAPI.rejectWithValue("An unknown error occurred.");
            }
        }
    }
);


// Async thunk for searching Transaction users by name
export const fetchTransactionUserById = createAsyncThunk<
    TransactionUser, // Return type on success
    { _id: string }, // Parameter type
    { rejectValue: string }
>(
    'transactionUsers/fetchTransactionUserById',
    async ({ _id }, thunkAPI) => {
        try {
            const response = await axios.get('/api/transactionUser/searchById', {
                params: { _id },
            });
            return response.data; // Assumes API returns an array of TransactionUser objects
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message || error.message
                );
            } else {
                return thunkAPI.rejectWithValue("An unknown error occurred.");
            }
        }
    }
);



const transactionUserSlice = createSlice({
    name: 'transactionUsers',
    initialState,
    reducers: {
        // Optionally add synchronous reducers here
    },
    extraReducers: (builder) => {
        // Handle createTransactionUser lifecycle
        builder.addCase(createTransactionUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createTransactionUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        // Handle searchTransactionUsers lifecycle
        builder.addCase(searchTransactionUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(searchTransactionUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default transactionUserSlice.reducer;
