import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ORIGIN } from "../Components/Utils";

const origin = ORIGIN + "/api";

// export const fetchTodos = createAsyncThunk<Todo[],undefined,{state: RootState}>('todos/fetchTodos',async ( _arg , thunkAPI)=>{
//     const state = thunkAPI.getState()
//     const token = state.auth.token
//     const response = await axios.get(`${origin}/todos/`,{ headers: {"Authorization" : `Bearer ${token}`}})
//     return response.data
// })

// export const createTodo = createAsyncThunk<Todo,Todo,{state: RootState}>('todos/createTodo',async (item,thunkAPI)=>{
//     const state = thunkAPI.getState()
//     const token = state.auth.token
//     const response = await axios.post(`${origin}/todos/`,item,{ headers: {"Authorization" : `Bearer ${token}`}})
//     return response.data
// })

// export const createSubtask = createAsyncThunk<Todo,{parentId:string,item:Todo},{state: RootState}>('todos/createSubtask',async ({parentId,item},thunkAPI)=>{
//     const state = thunkAPI.getState()
//     const token = state.auth.token
//     const response = await axios.post(`${origin}/todos/${parentId}/subtasks`,item,{ headers: {"Authorization" : `Bearer ${token}`}})
//     return response.data
// })

// export const editTodo = createAsyncThunk<Todo,Todo,{state: RootState}>('todos/editTodo',async (item,thunkAPI)=>{
//     const state = thunkAPI.getState()
//     const token = state.auth.token
//     const response = await axios.put(`${origin}/todos/${item._id}`,item,{ headers: {"Authorization" : `Bearer ${token}`}})
//     return response.data
// })

// export const deleteTodo = createAsyncThunk<{taskId : string, response : any},string,{state: RootState}>('todos/deleteTodo',async (taskId,thunkAPI)=>{
//     const state = thunkAPI.getState()
//     const token = state.auth.token
//     const response = await axios.delete(`${origin}/todos/${taskId}`,{ headers: {"Authorization" : `Bearer ${token}`}})
//     return {taskId, response : response.data}
// })

const initialState = {};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
    // builder.
    // addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
    //   state.todos = action.payload;
    // })
  },
});

// export const {} = todoSlice.actions

export default todoSlice.reducer;
