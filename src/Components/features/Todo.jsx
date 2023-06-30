import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

import { POST } from "../Utils";
import { useDispatch } from "react-redux";

let ORIGIN = `http://localhost:3000`

let postOptions = (input) => { return {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
}}

export const readTodo = createAsyncThunk('api/fetchData', async () => {
    const response = await fetch(ORIGIN+'/api/todos/read',postOptions({}));
    const data = await response.json();
    return data;
});


const initialState = {
    todos : [],
    render : false
}
export const todoSlice = createSlice({
    name : 'todo',
    initialState,
    reducers : {
        createTodo : (state,action)=>{
            POST('/api/todos/create',action.payload,()=>{});
        },
        updateTodo : (state,action)=>{
            POST('/api/todos/update',action.payload);
            state.render = !state.render
        },
        deleteTodo : (state,action)=>{
            POST('/api/todos/delete',action.payload);
            state.render = !state.render
        }
    },
    extraReducers(builder){
       builder.addCase(readTodo.fulfilled,(state,action)=>{
        state.todos = action.payload
       })
    }
})

export const {createTodo,updateTodo,deleteTodo} = todoSlice.actions

export default todoSlice.reducer;