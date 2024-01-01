import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';


const ORIGIN = 'http://localhost:8080'

export interface User{
    username : string,
    password : string
}

export const loginUser = createAsyncThunk<{token:string},User>('auth/loginUser',async (userData)=>{
    const response = await axios.post(`${ORIGIN}/login`, userData);
    return response.data;
})

// { headers: {"Authorization" : `Bearer ${token}`}
interface startState{
    token : string | null
}
const initialState : startState = {
    token : null
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken : (state, action) =>{
            state.token = action.payload
        },
        logout : (state, action) =>{
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder.
        addCase(loginUser.fulfilled, (state, action : PayloadAction<{token:string}> ) => {
            state.token = action.payload.token;
        })
        .addCase(loginUser.rejected, (state, action : any) => {
            alert("Wrong username/ password!");
        })
    },
});


export const {setToken,logout} = authSlice.actions

export default authSlice.reducer;

