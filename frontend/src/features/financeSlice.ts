
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { ORIGIN } from '../app/utils'


export interface FinanceUser{
  transactions : [],
  transactee : string,
  _id? : string
}
export type TransactionCategory =  "FOOD" | "TRANSPORT" | "EDUCATION" | "GROOMING" | "OTHER"


export interface Transaction{
  _id? : string
  transactee : string,
  amount : number,
  category :TransactionCategory,
  status : "PAID" | "UNPAID",
  mode : "SEND" | "RECEIVE",
  remarks? : string,
  updatedAt? : Date,
  createdAt? : Date,
}

export interface FinanceState {

}

const initialState: FinanceState = {

}

// createAsyncThunk<ReturnType,firstArgumentType>

export const fetchUsersByRegex = createAsyncThunk<FinanceUser[],string>('finance/fetchUsersByRegex', async (regex , thunkApi) => {
  try{
    const response = await axios.get(`${ORIGIN}/finance/user/regex/${regex}`);
    return response.data;
  }
  catch(err) {
      return thunkApi.rejectWithValue(err);
  }
})

export const fetchUserById = createAsyncThunk<FinanceUser,string>('finance/fetchUserById', async (id , thunkApi) => {
    try{
        const response = await axios.get(`${ORIGIN}/finance/user/${id}`);
        return response.data;
    }
    catch(err) {
        return thunkApi.rejectWithValue(err);
    }
  })


export const createFinanceUser = createAsyncThunk<FinanceUser[],string>('finance/createFinanceUser', async (transactee , thunkApi) => {
    try{
        const response = await axios.post(`${ORIGIN}/finance/user/`,{transactee});
        return response.data;
    }
    catch(err) {
        return thunkApi.rejectWithValue(err);
    }
})


export const payFinanceUser = createAsyncThunk<FinanceUser[],Transaction>('finance/payFinanceUser', async (transaction , thunkApi) => {
  try{
      const response = await axios.post(`${ORIGIN}/finance/transaction/`,transaction);
      return response.data;
  }
  catch(err) {
      return thunkApi.rejectWithValue(err);
  }
})
export const fetchAllTransactions = createAsyncThunk<Transaction[]>('finance/fetchAllTransactions', async (_,thunkApi) => {
  try{
      const response = await axios.get(`${ORIGIN}/finance/transaction/`);
      return response.data;
  }
  catch(err) {
      return thunkApi.rejectWithValue(err);
  }
})

export const deleteTransaction = createAsyncThunk<Transaction,string>('finance/deleteTransaction', async (_id,thunkApi) => {
  try{
      const response = await axios.delete(`${ORIGIN}/finance/transaction/${_id}`);
      return response.data;
  }
  catch(err) {
      return thunkApi.rejectWithValue(err);
  }
})
export const fetchRecentUsers = createAsyncThunk<Transaction[]>('finance/fetchRecentUsers', async (_id,thunkApi) => {
  try{
      const response = await axios.get(`${ORIGIN}/finance/user/recent`);
      return response.data;
  }
  catch(err) {
      return thunkApi.rejectWithValue(err);
  }
})




export const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
  },
  extraReducers(builder){
    builder
  }
  
})
export default financeSlice.reducer


