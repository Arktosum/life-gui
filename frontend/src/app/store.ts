import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counterSlice'
import financeUserReducer from '../features/financeUserSlice'
import transactionReducer from '../features/transactionSlice'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        financeUser: financeUserReducer,
        transaction: transactionReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;