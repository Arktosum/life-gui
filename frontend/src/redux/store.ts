import { configureStore } from '@reduxjs/toolkit'
import financeReducer from './reducers/financeReducer'
import friendReducer from './reducers/friendReducer'
import authReducer from './reducers/authReducer'

export const store = configureStore({
    reducer: {
        finance: financeReducer,
        friend: friendReducer,
        auth: authReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch