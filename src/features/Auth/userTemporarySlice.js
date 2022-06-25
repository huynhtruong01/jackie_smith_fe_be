import { createSlice } from '@reduxjs/toolkit'

const userTemporarySlice = createSlice({
    name: 'user2',
    initialState: {
        temporaryUser: null,
    },
    reducers: {
        saveUser(state, action) {
            state.temporaryUser = action.payload
        },
        resetUser(state, action) {
            state.temporaryUser = null
        },
    },
})

const { actions, reducer } = userTemporarySlice
export const { saveUser, resetUser } = actions
export default reducer
