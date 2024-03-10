import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'


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
    const response = await axios.get("http://localhost:3000/api/finance");
    return response.data
  },
)
export const createFinanceItem = createAsyncThunk('finance/create',async (data : FinanceFormData) => {
  const response = await axios.post("http://localhost:3000/api/finance",data);
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
      state.items = action.payload;
    })
    .addCase(createFinanceItem.fulfilled,(state ,action : PayloadAction<FinanceItem>)=>{
      // state.items = action.payload;
      console.log(action.payload);
    })
    
  }

})


export default financeSlice.reducer