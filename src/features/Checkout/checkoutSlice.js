import { createSlice } from '@reduxjs/toolkit'

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        checkout: {},
    },
    reducers: {
        addCheckout(state, action) {
            state.checkout = action.payload
        },
        resetCheckout(state) {
            state.checkout = {}
        },
    },
})

const { actions, reducer } = checkoutSlice
export const { addCheckout, resetCheckout } = actions
export default reducer
