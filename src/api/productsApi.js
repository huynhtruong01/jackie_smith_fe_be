import axiosClient from './axiosClient'

const productsApi = {
    getAll(params) {
        const url = '/products'
        return axiosClient.get(url, { params })
    },
    getById(id) {
        const url = `/products/${id}`
        return axiosClient.get(url)
    },
}

export default productsApi
