import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface FinanceUser {
    _id: string;
    username: string;
    createdAt?: string;
    updatedAt?: string;
}

interface FinanceUserState {
    loading: boolean;
    error: string | null;
}

const initialState: FinanceUserState = {
    loading: false,
    error: null,
};

// Async thunk for creating a new Finance user
export const createFinanceUser = createAsyncThunk<
    FinanceUser, // Return type on success
    { username: string }, // Parameter type
    { rejectValue: string }
>(
    'FinanceUsers/createFinanceUser',
    async ({ username }, thunkAPI) => {
        try {
            const response = await axios.post('/api/FinanceUser', { username });

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

// Async thunk for searching Finance users by name
export const searchFinanceUsers = createAsyncThunk<
    FinanceUser[], // Return type on success
    { username: string }, // Parameter type
    { rejectValue: string }
>(
    'FinanceUsers/searchFinanceUsers',
    async ({ username }, thunkAPI) => {
        try {
            const response = await axios.get('/api/financeUser/search', {
                params: { username },
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


// Async thunk for searching Finance users by name
export const fetchFinanceUserById = createAsyncThunk<
    FinanceUser, // Return type on success
    { _id: string }, // Parameter type
    { rejectValue: string }
>(
    'FinanceUsers/fetchFinanceUserById',
    async ({ _id }, thunkAPI) => {
        try {
            const response = await axios.get('/api/financeUser/searchById', {
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



const FinanceUserSlice = createSlice({
    name: 'FinanceUsers',
    initialState,
    reducers: {
        // Optionally add synchronous reducers here
    },
    extraReducers: (builder) => {
        // Handle createFinanceUser lifecycle
        builder.addCase(createFinanceUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createFinanceUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        // Handle searchFinanceUsers lifecycle
        builder.addCase(searchFinanceUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(searchFinanceUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default FinanceUserSlice.reducer;
