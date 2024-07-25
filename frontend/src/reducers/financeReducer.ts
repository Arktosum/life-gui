import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
// import type { RootState } from '../redux/store'
export interface FinanceState {
    value: number
}

const initialState: FinanceState = {
    value: 0,
}


const ORIGIN = `http://192.168.50.2:5000/api`


// Omitted transactions.
export interface FinanceUser {
    _id: string,
    transactee: string,
    transactions: string[]
}
export interface Transaction {
    _id: string,
    transactee: string | FinanceUser
    amount: number,
    category: "FOOD" | "TRANSPORT" | "GROOMING" | "OTHER" | "EDUCATION",
    mode: "SEND" | "RECEIVE",
    status: "PAID" | "UNPAID" | "PARTIAL",
    partial: number,
    remarks: string,
    createdAt: Date,
    updatedAt: Date
}

export type TransactionForm = Omit<Transaction, "_id" | "updatedAt" | "createdAt">

export const INITIAL_FINANCE_FORM_DATA: TransactionForm = {
    transactee: "",
    amount: 0,
    category: "OTHER",
    mode: "SEND",
    status: "UNPAID",
    partial: 0,
    remarks: "",
};


export const fetchAllTransactions = createAsyncThunk<Transaction[], void, { rejectValue: string }>(
    'finances/fetchAllTransactions',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${ORIGIN}/finance/transaction`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue((error as Error).message);
        }
    });

export const fetchFinanceUsersRegex = createAsyncThunk<FinanceUser[], string, { rejectValue: string }>(
    'finances/fetchFinanceUsersRegex',
    async (regex, thunkApi) => {
        try {
            const response = await axios.get(`${ORIGIN}/finance/${regex}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue((error as Error).message);
        }
    });


export const createFinanceUser = createAsyncThunk<FinanceUser, string, { rejectValue: string }>(
    'finances/createFinanceUser',
    async (user, thunkApi) => {
        try {
            const response = await axios.post(`${ORIGIN}/finance/user`, {
                transactee: user
            });
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue((error as Error).message);
        }
    });

export const fetchFinanceUserById = createAsyncThunk<FinanceUser, string, { rejectValue: string }>(
    'finances/fetchFinanceUserById',
    async (id, thunkApi) => {
        try {
            const response = await axios.get(`${ORIGIN}/finance/user/${id}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue((error as Error).message);
        }
    });

export const createTransaction = createAsyncThunk<Transaction, TransactionForm, { rejectValue: string }>(
    'finances/createTransaction',
    async (formData, thunkApi) => {
        try {
            const response = await axios.post(`${ORIGIN}/finance/transaction/`, formData);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue((error as Error).message);
        }
    });


export const financeSlice = createSlice({
    name: 'finances',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
    // extraReducers: (builder) => {
    //     // Add reducers for additional action types here, and handle loading state as needed
    //     builder.addCase(fetchAllTransactions.fulfilled, (state, action) => {
    //         // Add user to the state array
    //     })
    // },
})

export const { increment, decrement, incrementByAmount } = financeSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default financeSlice.reducer