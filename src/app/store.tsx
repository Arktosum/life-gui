import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../features/todoSlice'
import financeReducer from '../features/financeSlice'
import friendReducer from '../features/friendSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
    reducer : {
        todo : todoReducer,
        finance : financeReducer,
        friend : friendReducer,
        auth : authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
