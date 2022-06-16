import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        id: null,
        isShowCart: false,
        cartList: [],
    },
    reducers: {
        showCart(state) {
            state.isShowCart = true
        },
        hideCart(state) {
            state.isShowCart = false
        },
        getIdCartFromDB(state, action) {
            state.id = action.payload
        },
        getCartFromDB(state, action) {
            state.cartList = action.payload
        },
        addCart(state, action) {
            const cartItem = action.payload // {id, product, quantity, size}
            console.log(cartItem)
            const index = state.cartList.findIndex(
                (cart) => cart.id === cartItem.id && cartItem.size === cart.size
            )

            if (index >= 0) {
                state.cartList[index].quantity += cartItem.quantity
            } else {
                state.cartList.push(cartItem)
            }
        },
        updateQuantity(state, action) {
            const cartItem = action.payload // {id, quantity}
            const index = state.cartList.findIndex((cart) => cart.id === cartItem.id)

            if (index >= 0) {
                state.cartList[index].quantity = cartItem.quantity
            }
        },
        removeCart(state, action) {
            const id = action.payload
            const index = state.cartList.findIndex((cart) => cart.id === id)

            if (index >= 0) {
                state.cartList.splice(index, 1)
            }
        },
        resetCart(state) {
            state.cartList = []
            state.id = null
        },
        removeAllCart(state) {
            state.cartList = []
        },
        setCartList(state, action) {
            const cartList = action.payload
            state.cartList = cartList || []
        },
    },
})

const { actions, reducer } = cartSlice
export const {
    showCart,
    hideCart,
    getIdCartFromDB,
    getCartFromDB,
    addCart,
    updateQuantity,
    removeCart,
    resetCart,
    removeAllCart,
    setCartList,
} = actions
export default reducer
