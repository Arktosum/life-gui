import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';


const POSTS_URL = ''

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async ()=>{
    await axios.get(POSTS_URL)
    .then((response)=>[...response.data])
    .catch(error => error.message);
})

const initialState = {
    todos : []
}

export const todoSlice = createSlice({
    name : 'todo',
    initialState,
    reducers : {
        addTodo : (state)=>{

        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending,(state,action:PayloadAction<any>)=>{

        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            
        })
    }
})

export const {addTodo} = todoSlice.actions

export default todoSlice.reducer;
