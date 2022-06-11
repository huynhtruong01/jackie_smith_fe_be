import axiosClient from './axiosClient'

const usersApi = {
    update(user) {
        const url = `/users/${user?._id}`
        return axiosClient.put(url, user)
    },
}

export default usersApi
