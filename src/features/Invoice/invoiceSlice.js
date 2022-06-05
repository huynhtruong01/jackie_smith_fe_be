import { createSlice } from '@reduxjs/toolkit'

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: {
        invoice: {},
    },
    reducers: {
        addInvoice(state, action) {
            state.invoice = action.payload
        },
        resetInvoice(state) {
            state.invoice = {}
        },
    },
})

const { actions, reducer } = invoiceSlice
export const { addInvoice, resetInvoice } = actions
export default reducer
