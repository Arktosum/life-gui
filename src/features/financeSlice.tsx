import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../app/store';


const ORIGIN = 'http://localhost:8080/api'

export type Status = "PAID" | "UNPAID" | "PARTIAL"
export type Mode = "SEND" | "RECEIVE"
export interface Finance{
    _id?: string;
    transactee: String,
    amount: Number,
    category: String,
    description: String,
    status: Status
    mode: Mode
}


export const fetchFinances = createAsyncThunk<Finance[],undefined,{state: RootState}>('Finances/fetchFinances',async (arg,thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth.token
    const response = await axios.get(`${ORIGIN}/finances/`,{ headers: {"Authorization" : `Bearer ${token}`}})
    return response.data
})

export const createFinance = createAsyncThunk<Finance,Finance,{state: RootState}>('Finances/createFinance',async (item,thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth.token
    const response = await axios.post(`${ORIGIN}/finances/`,item,{ headers: {"Authorization" : `Bearer ${token}`}})
    return response.data
})

export const editFinance = createAsyncThunk<Finance,Finance,{state: RootState}>('Finances/editFinance',async (item,thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth.token
    const response = await axios.put(`${ORIGIN}/finances/${item._id}`,item,{ headers: {"Authorization" : `Bearer ${token}`}})
    return response.data
})

export const deleteFinance = createAsyncThunk<{taskId : string, response : any},string,{state: RootState}>('Finances/deleteFinance',async (taskId,thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth.token
    const response = await axios.delete(`${ORIGIN}/finances/${taskId}`,{ headers: {"Authorization" : `Bearer ${token}`}})
    return {taskId, response : response.data}
})

interface startState{
    finances : Finance[]
}
const initialState : startState = {
    finances : []
}


export const initialFormState  : Finance= {
    transactee : "",
    amount : 0,
    category : "OTHER",
    description : "",
    status : "UNPAID" as Status,
    mode : "SEND" as Mode,
}

export const financeSlice = createSlice({
    name: 'finance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.
        addCase(fetchFinances.fulfilled, (state, action: PayloadAction<Finance[]>) => {
          state.finances = action.payload;
        })
        .addCase(createFinance.fulfilled, (state, action: PayloadAction<Finance>) => {
          state.finances = [action.payload, ...state.finances];
        })
        .addCase(deleteFinance.fulfilled, (state, action: PayloadAction<{ taskId: string; response: any }>) => {
          state.finances = state.finances.filter((item) => item._id !== action.payload.taskId);
        })
        .addCase(editFinance.fulfilled, (state, action: PayloadAction<Finance>) => {
          state.finances = state.finances.map((item) => (item._id === action.payload._id ? action.payload : item));
        });
    },
});


export const {} = financeSlice.actions

export default financeSlice.reducer;
