import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";


export const createTodo = createAsyncThunk('createTodo',()=>{
    return POST('/todos/read');
})


const INITIAL_STATE = {}
export const todoSlice = createSlice({
    name : 'todo',
    initialState : {value : INITIAL_STATE},
    reducers : {
        // createTodo : (state,action)=>{
        //     state.value = action.payload
        // },
        // deleteTodo : (state)=>{
        //     state.value = {}
        // },
    },
    extraReducers:{
        [createTodo.pending]:(state)=>{

        },
        [createTodo.fulfilled]:(state,action)=>{

        },
        [createTodo.rejected]:(state)=>{

        }
    }
})

// export const {createTodo,deleteTodo} = todoSlice.actions
export default todoSlice.reducer;