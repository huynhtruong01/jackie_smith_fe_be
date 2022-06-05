import { createSelector } from '@reduxjs/toolkit'

export const totalQuantity = createSelector(
    (state) => state.cart.cartList,
    (items) => items.reduce((total, item) => total + item.quantity, 0)
)

export const totalPriceFromCart = createSelector(
    (state) => state.cart.cartList,
    (items) => items.reduce((total, item) => total + item.product.salePrice * item.quantity, 0)
)
