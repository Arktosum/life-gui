
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { ORIGIN } from '../app/utils'



export interface Friend{
  _id? : string
  name : string,
  username : string,
  phoneNumber : string,
  dateOfBirth : Date,
  gender : "MALE" | "FEMALE" | "OTHER",
  description : string,
  story : string,
  displayImage : string,
}

export interface friendState {

}

const initialState: friendState = {

}

// createAsyncThunk<ReturnType,firstArgumentType>

export const createFriend = createAsyncThunk<Friend,Friend>('friend/createFriend', async (formData , thunkApi) => {
  try{
    const response = await axios.post(`${ORIGIN}/friend/`,formData);
    return response.data;
  }
  catch(err) {
      return thunkApi.rejectWithValue(err);
  }
})


export const updateFriend = createAsyncThunk<Friend,Friend>('friend/updateFriend', async (formData , thunkApi) => {
    try{
      const response = await axios.put(`${ORIGIN}/friend/${formData._id}`,formData);
      return response.data;
    }
    catch(err) {
        return thunkApi.rejectWithValue(err);
    }
  })
  
export const deleteFriend = createAsyncThunk<Friend>('friend/deleteFriend', async (_id , thunkApi) => {
try{
    const response = await axios.delete(`${ORIGIN}/friend/${_id}`);
    return response.data;
}
catch(err) {
    return thunkApi.rejectWithValue(err);
}
})



export const fetchFriendById = createAsyncThunk<Friend>('friend/fetchFriendById', async (_id , thunkApi) => {
    try{
        const response = await axios.get(`${ORIGIN}/friend/${_id}`);
        return response.data;
    }
    catch(err) {
        return thunkApi.rejectWithValue(err);
    }
})


export const fetchAllFriends = createAsyncThunk('friend/fetchAllFriends', async (_ , thunkApi) => {
    try{
        const response = await axios.get(`${ORIGIN}/friend/`);
        return response.data;
    }
    catch(err) {
        return thunkApi.rejectWithValue(err);
    }
})

export const fetchFriendsRegex = createAsyncThunk<Friend,string>('friend/fetchFriendsRegex', async (regex , thunkApi) => {
    try{
        const response = await axios.get(`${ORIGIN}/friend/regex/${regex}`);
        return response.data;
    }
    catch(err) {
        return thunkApi.rejectWithValue(err);
    }
})

    
export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
  },
  extraReducers(builder){
    builder
  }
  
})
export default friendSlice.reducer


