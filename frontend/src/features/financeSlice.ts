
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { ORIGIN } from '../app/utils'


export interface FinanceUser{
  transactions : [],
  transactee : string,
  _id? : string
}

export interface Transaction{

}
export interface FinanceState {

}

const initialState: FinanceState = {

}
// createAsyncThunk<ReturnType,firstArgumentType>

export const fetchUsersByRegex = createAsyncThunk<FinanceUser[],string>('finance/fetchUsersByRegex', async (regex , thunkApi) => {

  try{
      const response = await axios.get(`${ORIGIN}/finance/user/${regex}`);
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


