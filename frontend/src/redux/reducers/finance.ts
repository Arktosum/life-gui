import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface FinanceState {
}

const initialState: FinanceState = {
}

export interface Transaction {

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



export const financeSlice = createSlice({
    name: 'finance',
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
})

// export const { increment, decrement, incrementByAmount } = financeSlice.actions

export default financeSlice.reducer