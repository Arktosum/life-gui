import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
import { ORIGIN } from '../Components/Utils';

let origin = ORIGIN + "/api"

export interface User{
    username : string,
    password : string
}

export const loginUser = createAsyncThunk<{token:string},User>('auth/loginUser',async (userData)=>{
    const response = await axios.post(`${origin}/login`, userData);
    return response.data;
})

// { headers: {"Authorization" : `Bearer ${token}`}
interface startState{
    token : string | null
}
const initialState : startState = {
    token : localStorage.getItem('token') ?? null,
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken : (state, action) =>{
            state.token = action.payload
            localStorage.setItem('token', action.payload);
        },
        logout : (state, _action) =>{
            state.token = null
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder.
        addCase(loginUser.fulfilled, (state, action : PayloadAction<{token:string}> ) => {
            state.token = action.payload.token;
            localStorage.setItem('token', state.token);

        })
        .addCase(loginUser.rejected, (_state, _action : any) => {
            alert("Wrong username/ password!");
        })
    },
});


export const {setToken,logout} = authSlice.actions

export default authSlice.reducer;

