import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface FriendState {
}

const initialState: FriendState = {
}

export interface FriendUser {
    _id?: string
    name: string,
    phoneNumber?: string,
    dateOfBirth?: Date,
    displayImage?: string,
    description?: string,
    story?: string,
    gender: 'MALE' | 'FEMALE' | 'OTHER',
    updatedAt?: Date,
    createdAt?: Date
}

export const fetchAllFriendUsers = createAsyncThunk<FriendUser[], void>(
    'friend/fetchAllFriendUsers',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`/friend`)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)

export const createFriendUser = createAsyncThunk<FriendUser, string>(
    'friend/createFriendUser',
    async (friendUser, thunkApi) => {
        try {
            const response = await axios.post(`/friend`, friendUser)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)



export const updateFriendUserById = createAsyncThunk<FriendUser, FriendUser>(
    'friend/updateFriendUserById',
    async (user, thunkApi) => {
        console.log(user);
        try {
            const response = await axios.post(`/friend/${user._id}`, user)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)


export const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {

    },
})


export default friendSlice.reducer