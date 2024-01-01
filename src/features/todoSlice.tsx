import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../app/store';
import { ORIGIN } from '../Components/Utils';

let origin = ORIGIN + "/api"


export type Priority = "LOW" | "MEDIUM" | "HIGH"
export type Status = "PENDING" | "COMPLETED"
export interface Todo{
    _id?: string;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    subtasks: Todo[]; 
    isSubtask: boolean;
    dueDate: Date;
}

export const fetchTodos = createAsyncThunk<Todo[],undefined,{state: RootState}>('todos/fetchTodos',async ( _arg , thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth.token
    const response = await axios.get(`${origin}/todos/`,{ headers: {"Authorization" : `Bearer ${token}`}})
    return response.data
})

export const createTodo = createAsyncThunk<Todo,Todo,{state: RootState}>('todos/createTodo',async (item,thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth.token
    const response = await axios.post(`${origin}/todos/`,item,{ headers: {"Authorization" : `Bearer ${token}`}})
    return response.data
})

export const createSubtask = createAsyncThunk<Todo,{parentId:string,item:Todo},{state: RootState}>('todos/createSubtask',async ({parentId,item},thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth.token
    const response = await axios.post(`${origin}/todos/${parentId}/subtasks`,item,{ headers: {"Authorization" : `Bearer ${token}`}})
    return response.data
})

export const editTodo = createAsyncThunk<Todo,Todo,{state: RootState}>('todos/editTodo',async (item,thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth.token
    const response = await axios.put(`${origin}/todos/${item._id}`,item,{ headers: {"Authorization" : `Bearer ${token}`}})
    return response.data
})

export const deleteTodo = createAsyncThunk<{taskId : string, response : any},string,{state: RootState}>('todos/deleteTodo',async (taskId,thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth.token
    const response = await axios.delete(`${origin}/todos/${taskId}`,{ headers: {"Authorization" : `Bearer ${token}`}})
    return {taskId, response : response.data}
})

interface startState{
    todos : Todo[],
}
const initialState : startState = {
    todos : [],
}

export const initialFormState  : Todo= {
    title : "",
    description : "",
    priority : "LOW" as Priority,
    status : "PENDING" as Status,
    dueDate : new Date(Date.now()) as Date,
    subtasks : [],
    isSubtask : false,
  }
  
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.
        addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
          state.todos = action.payload;
        })
        .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
          state.todos = [action.payload, ...state.todos];
        })
        .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<{ taskId: string; response: any }>) => {
          state.todos = state.todos.filter((item) => item._id !== action.payload.taskId);
        })
        .addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
          state.todos = state.todos.map((item) => (item._id === action.payload._id ? action.payload : item));
        });
    },
});


export const {} = todoSlice.actions

export default todoSlice.reducer;
