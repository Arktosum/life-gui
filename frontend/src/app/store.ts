import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counterSlice'
import transactionUserReducer from '../features/transactionUserSlice'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        transactionUsers: transactionUserReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;