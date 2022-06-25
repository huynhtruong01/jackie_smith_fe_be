import axiosClient from './axiosClient'

const usersApi = {
    update(user) {
        const url = `/users/${user?._id}`
        return axiosClient.put(url, user)
    },
    checkEmail(data) {
        const url = `/users/check-email`
        return axiosClient.post(url, data)
    },
    changePassword(data) {
        const url = `/users/change-password/${data._id}`
        return axiosClient.put(url, data)
    },
}

export default usersApi
