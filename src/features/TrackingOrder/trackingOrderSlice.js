import { createSlice } from '@reduxjs/toolkit'

const trackingOrderSlice = createSlice({
    name: 'trackingOrder',
    initialState: {
        trackingOrderList: [],
    },
    reducers: {
        addTrackingOrder(state, action) {
            state.trackingOrderList = action.payload
        },
        resetTrackingOrder(state) {
            state.trackingOrderList = []
        },
    },
})

const { actions, reducer } = trackingOrderSlice
export const { addTrackingOrder, resetTrackingOrder } = actions
export default reducer
