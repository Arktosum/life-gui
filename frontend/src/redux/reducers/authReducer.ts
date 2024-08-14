import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface authState {
    user: {
        username: string | null,
        _id: string | null
    }
}


const initialState: authState = {
    user: {
        username: null,
        _id: null
    }
}
export interface User {
    username?: string,
    password: string,
    email: string
}

export const loginUser = createAsyncThunk<{ username: string, _id: string }, User>(
    'auth/loginUser',
    async (user, thunkApi) => {
        try {
            const response = await axios.post(`/auth/login`, user)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)

export const logoutUser = createAsyncThunk<void, void>(
    'auth/logoutUser',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`/auth/logout`)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    },
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser(state, action) {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            sessionStorage.setItem('user', JSON.stringify(state.user));
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = {
                username: null,
                _id: null,
            }
            sessionStorage.removeItem('user');
        })
    }
})

export const { setAuthUser } = authSlice.actions

export default authSlice.reducer