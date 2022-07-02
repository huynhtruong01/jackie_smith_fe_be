import axiosClient from './axiosClient'

const stylesApi = {
    getAll() {
        const url = '/styles'
        return axiosClient.get(url)
    },
    getByCategory(id) {
        console.log(id)
        const url = `/styles/category/${id}`
        return axiosClient.get(url)
    },
    getById(id) {
        const url = `/styles/${id}`
        return axiosClient.get(url)
    },
}

export default stylesApi
