import { createSlice } from '@reduxjs/toolkit'

const toggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        isToggle: false,
    },
    reducers: {
        changeToggle(state, action) {
            state.isToggle = action.payload
        },
    },
})

const { actions, reducer } = toggleSlice
export const { changeToggle } = actions
export default reducer
