import axiosClient from './axiosClient'

const colorsApi = {
    getAll() {
        const url = '/colors'
        return axiosClient.get(url)
    },
}

export default colorsApi
