import axiosClient from './axiosClient'

const ordersApi = {
    getAll(params) {
        const url = '/orders'
        return axiosClient.get(url, { params })
    },
    getAllByUserId(data) {
        const url = '/orders/orders-userid'
        return axiosClient.post(url, data)
    },
    getAllByUserIdOther(data) {
        const url = '/orders/orders-userid-other'
        return axiosClient.post(url, data)
    },
    getById(id) {
        const url = `/orders/${id}`
        return axiosClient.get(url)
    },
    add(data) {
        const url = '/orders'
        return axiosClient.post(url, data)
    },
    update(data) {
        const url = `/orders/${data._id}`
        return axiosClient.put(url, data)
    },
    remove(id) {
        const url = `/orders/${id}`
        return axiosClient.delete(url)
    },
}

export default ordersApi
