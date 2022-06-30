import axiosClient from './axiosClient'

const authApi = {
    register(data, option) {
        const url = '/auth/register'
        return axiosClient.post(url, data)
    },
    login(data) {
        const url = '/auth/login'
        return axiosClient.post(url, data)
    },
    loginGoogle(data) {
        const url = '/auth/login-google'
        return axiosClient.post(url, data)
    },
}

export default authApi
