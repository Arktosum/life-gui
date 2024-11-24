import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface FinanceState {
}

const initialState: FinanceState = {
}

export interface FinanceUser {
    _id?: string,
    transactee: string,
    transactions: Transaction[],
    createdAt?: Date,
    updatedAt?: Date,
}

export interface Transaction {
    _id?: string,
    transactee: string | FinanceUser,
    amount: number,
    category: "FOOD" | "TRANSPORT" | "GROOMING" | "OTHER" | "EDUCATION",
    mode: "SEND" | "RECEIVE",
    status: "PAID" | "UNPAID" | "PARTIAL",
    partial: number,
    remarks: string,
    completedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date
}

export const fetchAllTransactions = createAsyncThunk<Transaction[], void>(
    'finance/fetchAllTransactions',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`/finance/transaction`)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)

export const fetchFinanceUsersRegex = createAsyncThunk<FinanceUser[], string>(
    'finance/fetchFinanceUsersRegex',
    async (regex, thunkApi) => {
        try {
            const response = await axios.get(`/finance/user/${regex}`)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)
export const createFinanceUser = createAsyncThunk<FinanceUser, string>(
    'finance/createFinanceUser',
    async (transactee, thunkApi) => {
        try {
            const response = await axios.post(`/finance/user`, { transactee })
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)

export const fetchFinanceUserById = createAsyncThunk<FinanceUser, string>(
    'finance/fetchFinanceUserById',
    async (id, thunkApi) => {
        try {
            const response = await axios.get(`/finance/user/id/${id}`)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)


export const createTransaction = createAsyncThunk<Transaction, Transaction>(
    'finance/createTransaction',
    async (transaction, thunkApi) => {
        try {
            const response = await axios.post(`/finance/transaction`, transaction)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)
export const deleteTransactionById = createAsyncThunk<Transaction, string>(
    'finance/deleteTransactionById',
    async (id, thunkApi) => {
        try {
            const response = await axios.delete(`/finance/transaction/${id}`)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)

export const fetchTransactionById = createAsyncThunk<Transaction, string>(
    'finance/fetchTransactionById',
    async (id, thunkApi) => {
        try {
            const response = await axios.get(`/finance/transaction/${id}`)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)

export const updateTransactionById = createAsyncThunk<Transaction, Transaction>(
    'finance/updateTransactionById',
    async (item, thunkApi) => {
        try {
            const response = await axios.post(`/finance/transaction/${item._id}`, item)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)

export const fetchFinanceBalance = createAsyncThunk<{ balance: number, due: number }, void>(
    'finance/fetchFinanceBalance',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`/finance/balance`)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)



export const financeSlice = createSlice({
    name: 'finance',
    initialState,
    reducers: {
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
})

// export const { increment, decrement, incrementByAmount } = financeSlice.actions

export default financeSlice.reducer