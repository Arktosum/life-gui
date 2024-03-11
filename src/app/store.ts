import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/authSlice'
import financeSlice from '../features/financeSlice'
import friendSlice from '../features/friendSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    finance : financeSlice,
    friend : friendSlice
  },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch