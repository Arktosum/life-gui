import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../app/store';


const ORIGIN = 'http://localhost:8080/api'

export type Gender = "MALE" | "FEMALE" | "OTHER"
export interface Friend{
    _id?: string;
    name: string,
    phoneNumber: string,
    dateOfBirth: Date,
    displayImage: string,
    description: string,
    story: string,
    gender: Gender
}


export const fetchFriends = createAsyncThunk<Friend[],undefined,{state: RootState}>('Friends/fetchFriends',async (arg,thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth.token
    const response = await axios.get(`${ORIGIN}/friends/`,{ headers: {"Authorization" : `Bearer ${token}`}})
    return response.data
})

export const createFriend = createAsyncThunk<Friend,Friend,{state: RootState}>('Friends/createFriend',async (item,thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth.token
    const response = await axios.post(`${ORIGIN}/friends/`,item,{ headers: {"Authorization" : `Bearer ${token}`}})
    return response.data
})

export const editFriend = createAsyncThunk<Friend,Friend,{state: RootState}>('Friends/editFriend',async (item,thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth.token
    const response = await axios.put(`${ORIGIN}/friends/${item._id}`,item,{ headers: {"Authorization" : `Bearer ${token}`}})
    return response.data
})

export const deleteFriend = createAsyncThunk<{taskId : string, response : any},string,{state: RootState}>('Friends/deleteFriend',async (taskId,thunkAPI)=>{
    const state = thunkAPI.getState()
    const token = state.auth.token
    const response = await axios.delete(`${ORIGIN}/friends/${taskId}`,{ headers: {"Authorization" : `Bearer ${token}`}})
    return {taskId, response : response.data}
})

interface startState{
    friends : Friend[]
}
const initialState : startState = {
    friends : []
}


export const initialFormState  : Friend= {
    name: "",
    phoneNumber: "",
    dateOfBirth: new Date(Date.now()),
    displayImage: "",
    description: "",
    story: "",
    gender : "OTHER"
}

export const FriendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.
        addCase(fetchFriends.fulfilled, (state, action: PayloadAction<Friend[]>) => {
          state.friends = action.payload;
        })
        .addCase(createFriend.fulfilled, (state, action: PayloadAction<Friend>) => {
          state.friends = [action.payload, ...state.friends];
        })
        .addCase(deleteFriend.fulfilled, (state, action: PayloadAction<{ taskId: string; response: any }>) => {
          state.friends = state.friends.filter((item) => item._id !== action.payload.taskId);
        })
        .addCase(editFriend.fulfilled, (state, action: PayloadAction<Friend>) => {
          state.friends = state.friends.map((item) => (item._id === action.payload._id ? action.payload : item));
        });
    },
});


export const {} = FriendSlice.actions

export default FriendSlice.reducer;
