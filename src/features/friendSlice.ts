import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ORIGIN } from '../app/utils'

const friendAPI = ORIGIN + '/friend'
export interface FriendItem {
  _id : string,
  name : string,
  phoneNumber : string,
  story : string,
  dateOfBirth : Date,
  displayImage : string,
  description : string,
  gender : "MALE" | "FEMALE" | "OTHER"
  createdAt : Date,
  updatedAt : Date
}
export interface FriendFormData extends Omit<FriendItem,'_id' |'createdAt' | 'updatedAt'>{}
interface friendState{
  items :  FriendItem[]
}
// Define the initial state using that type
const initialState: friendState = {
  items : []
}

export const fetchFriendItems = createAsyncThunk('friend/fetchAll',async () => {
    const response = await axios.get(`${friendAPI}/`);
    return response.data
  },
)
export const createFriendItem = createAsyncThunk('friend/create',async (data : FriendFormData) => {
  const response = await axios.post(`${friendAPI}/`,data);
  return response.data
},
)

export const deleteFriendItem = createAsyncThunk('friend/delete',async (data : FriendItem) => {
  const response = await axios.delete(`${friendAPI}/${data._id}`);
  return response.data
},
)

export const updateFriendItem = createAsyncThunk('friend/patch',async (data : FriendItem) => {
  const response = await axios.patch(`${friendAPI}/${data._id}`,data);
  return response.data
},
)


export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
 
  },
  extraReducers : (builder)=>{
    builder
    .addCase(fetchFriendItems.fulfilled,(state ,action : PayloadAction<FriendItem[]>)=>{
      state.items = action.payload
    })
    .addCase(createFriendItem.fulfilled,(state ,action : PayloadAction<FriendItem>)=>{
      // state.items = action.payload;
      state.items = [action.payload,...state.items]
    })
    .addCase(updateFriendItem.fulfilled,(state ,action : PayloadAction<FriendItem>)=>{
      // state.items = action.payload;
      state.items = state.items.map((item)=>item._id == action.payload._id ? action.payload : item)
    })
    .addCase(deleteFriendItem.fulfilled,(state ,action : PayloadAction<FriendItem>)=>{
      // state.items = action.payload;
      state.items = state.items.filter((item)=>item._id != action.payload._id);
    })
    
  }

})


export default friendSlice.reducer