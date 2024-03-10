import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie';


interface authState {
  user : User | null,
  token : string | null
}

// Define the initial state using that type
const initialState: authState = {
  user : null,
  token :  Cookies.get('token') || null, // Load token from cookies if available,
}

interface User{
  username : string,
  password : string
}
export const loginUser = createAsyncThunk('auth/loginUser',async (data : User) => {
    const response = await axios.post("http://localhost:3000/api/auth/login",data);
    return response.data
  },
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      Cookies.remove('token'); // Remove token cookie on logout
    },
  },
  extraReducers : (builder)=>{
    builder
    .addCase(loginUser.fulfilled,(state ,action : PayloadAction<{token : string}>)=>{
      state.token = action.payload.token;
      Cookies.set('token', action.payload.token, { expires: 1 }); // 1 day
    })
  }

})

export const { logoutUser } = authSlice.actions

export default authSlice.reducer