import axiosClient from './axiosClient'

const cartsApi = {
    getAll(params) {
        const url = '/carts'
        return axiosClient.get(url, { params })
    },
    getById(id) {
        const url = `/carts/${id}`
        return axiosClient.get(url)
    },
    getByUserId(id) {
        const url = `/carts/user/${id}`
        return axiosClient.get(url)
    },
    add(data) {
        // userId, productId, quantity
        const url = '/carts'
        return axiosClient.post(url, data)
    },
    updateQuantity(data) {
        // userId, productId, quantity
        const url = '/carts/update-quantity'
        return axiosClient.post(url, data)
    },
    updateCart(data) {
        // userId, productId
        const url = '/carts/update-cart'
        return axiosClient.post(url, data)
    },
    remove(id) {
        const url = `/carts/${id}`
        return axiosClient.delete(url)
    },
    removeAllCart(data) {
        const url = '/carts/remove-all-cart-item'
        return axiosClient.post(url, data)
    },
}

export default cartsApi
