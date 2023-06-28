import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { POST } from "../Utils";

let ORIGIN = `http://localhost:3000`

let postOptions = (input) => { return {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
}}

export const readTodo = createAsyncThunk('api/fetchData', async () => {
    try {
      const response = await fetch(ORIGIN+'/api/todos/read',postOptions({}));
      if (!response.ok) {
        throw Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw Error('Failed to fetch data');
    }
  });



const initialState = {
    todos : []
}
export const todoSlice = createSlice({
    name : 'todo',
    initialState,
    reducers : {
        createTodo : (state,action)=>{
            POST('/api/todos/create',action.payload);
        },
        updateTodo : (state,action)=>{
            POST('/api/todos/update',action.payload);
        }
        
    },
    extraReducers(builder){
       builder.addCase(readTodo.fulfilled,(state,action)=>{
        state.todos = action.payload
       })
    }
})

export const {createTodo,updateTodo} = todoSlice.actions

export default todoSlice.reducer;