import { createSlice } from '@reduxjs/toolkit'

const trackingOrderSlice = createSlice({
    name: 'trackingOrder',
    initialState: {
        trackingOrderList: [],
        trackingByUserOrderList: [],
    },
    reducers: {
        addTrackingOrderUser(state, action) {
            state.trackingByUserOrderList = action.payload
        },
        addTrackingOrder(state, action) {
            state.trackingOrderList = action.payload
        },
        resetTrackingOrderUser(state) {
            state.trackingByUserOrderList = []
        },
        resetTrackingOrder(state) {
            state.trackingOrderList = []
        },
    },
})

const { actions, reducer } = trackingOrderSlice
export const {
    addTrackingOrderUser,
    addTrackingOrder,
    resetTrackingOrderUser,
    resetTrackingOrder,
} = actions
export default reducer
