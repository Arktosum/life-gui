import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export type TransactionCategory = "EDUCATION" | "FOOD" | "TRANSPORTATION" | "HOUSING" | "GROOMING" | "OTHER" | "LENDING"
export interface Transaction {
    _id?: string;
    transactee?: { username: string } | string;
    amount: number;
    remarks: string,
    mode: "SEND" | "RECEIVE";
    status: "PAID" | "UNPAID";
    completedAt?: Date;
    category: TransactionCategory
    createdAt?: string;
    updatedAt?: string;
}

interface TransactionState {
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    loading: false,
    error: null,
};

// Async thunk for creating a new Transaction user
export const createTransaction = createAsyncThunk<
    Transaction, // Return type on success
    Transaction, // Parameter type
    { rejectValue: string }
>(
    'financeUser/createTransaction',
    async (transaction, thunkAPI) => {
        try {
            const response = await axios.post('/api/transaction', transaction);
            return response.data; // Assumes API returns the created FinanceUser object
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
export const fetchTransactionById = createAsyncThunk<
    Transaction, // Return type on success
    { _id: string }, // Parameter type
    { rejectValue: string }
>(
    'financeUser/fetchFinanceUserById',
    async ({ _id }, thunkAPI) => {
        try {
            const response = await axios.get('/api/transaction/searchById', {
                params: { _id },
            });
            return response.data; // Assumes API returns an array of FinanceUser objects
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



export const fetchAllTransactions = createAsyncThunk<
    Transaction[], // Return type on success
    undefined, // Parameter type
    { rejectValue: string }
>(
    'financeUser/fetchAllTransactions',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/api/transaction');
            return response.data; // Assumes API returns an array of FinanceUser objects
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


const financeUserlice = createSlice({
    name: 'financeUser',
    initialState,
    reducers: {
        // Optionally add synchronous reducers here
    },
    extraReducers: (builder) => {
        // Handle createFinanceUser lifecycle
        builder.addCase(createTransaction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createTransaction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default financeUserlice.reducer;


