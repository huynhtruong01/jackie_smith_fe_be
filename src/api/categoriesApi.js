import axiosClient from './axiosClient'

const categoriesApi = {
    getAll(params) {
        const url = '/categories'
        return axiosClient.get(url, { params })
    },
    getById(id) {
        const url = `/categories/${id}`
        return axiosClient.get(url)
    },
}

export default categoriesApi
