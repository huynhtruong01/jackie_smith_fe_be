import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user2',
    initialState: {
        currentUser: null,
    },
    reducers: {
        loginAndSaveUser(state, action) {
            state.currentUser = action.payload
        },
        logout(state) {
            state.currentUser = null
        },
    },
})

const { actions, reducer } = userSlice
export const { loginAndSaveUser, logout } = actions
export default reducer
