import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ORIGIN } from '../app/utils'

const financeAPI = ORIGIN + '/finance'
export interface FinanceItem {
  _id : string,
  transactee : string,
  amount : number,
  category : "FOOD" | "TRANSPORT" | "EDUCATION" | "GROOMING" | "OTHER",
  description : string,
  status : "PAID" | "UNPAID" | "PARTIAL",
  mode : "SEND" | "RECEIVE",
  createdAt : Date,
  updatedAt : Date
}
export interface FinanceFormData extends Omit<FinanceItem,'_id' |'createdAt' | 'updatedAt'>{}
interface financeState{
  items :  FinanceItem[]
}
// Define the initial state using that type
const initialState: financeState = {
  items : []
}

export const fetchFinanceItems = createAsyncThunk('finance/fetchAll',async () => {
    const response = await axios.get(`${financeAPI}/`);
    return response.data
  },
)
export const createFinanceItem = createAsyncThunk('finance/create',async (data : FinanceFormData) => {
  const response = await axios.post(`${financeAPI}/`,data);
  return response.data
},
)

export const deleteFinanceItem = createAsyncThunk('finance/delete',async (data : FinanceItem) => {
  const response = await axios.delete(`${financeAPI}/${data._id}`);
  return response.data
},
)

export const updateFinanceItem = createAsyncThunk('finance/patch',async (data : FinanceItem) => {
  const response = await axios.patch(`${financeAPI}/${data._id}`,data);
  return response.data
},
)


export const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
 
  },
  extraReducers : (builder)=>{
    builder
    .addCase(fetchFinanceItems.fulfilled,(state ,action : PayloadAction<FinanceItem[]>)=>{
      state.items = action.payload
    })
    .addCase(createFinanceItem.fulfilled,(state ,action : PayloadAction<FinanceItem>)=>{
      // state.items = action.payload;
      state.items = [action.payload,...state.items]
    })
    .addCase(updateFinanceItem.fulfilled,(state ,action : PayloadAction<FinanceItem>)=>{
      // state.items = action.payload;
      state.items = state.items.map((item)=>item._id == action.payload._id ? action.payload : item)
    })
    .addCase(deleteFinanceItem.fulfilled,(state ,action : PayloadAction<FinanceItem>)=>{
      // state.items = action.payload;
      state.items = state.items.filter((item)=>item._id != action.payload._id);
    })
    
  }

})


export default financeSlice.reducer