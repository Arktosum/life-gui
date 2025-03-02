import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

// Define a type for the slice state
interface CounterState {
    value: number
}

// ReturnType
const fetchUserById = createAsyncThunk(
    'users/fetchById',
    // if you type your function argument here
    async (userId: number) => {
        const response = await fetch(`https://reqres.in/api/users/${userId}`)
        return await response.json();
    },
)
// Define the initial state using that type
const initialState: CounterState = {
    value: 0,
}
export const counterSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchUserById.pending, (state, action) => {
            // both `state` and `action` are now correctly typed
            // based on the slice state and the `pending` action creator
            state.value = action.payload!;
        })
    },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer

