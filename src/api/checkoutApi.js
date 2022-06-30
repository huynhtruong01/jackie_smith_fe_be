import axiosClient from './axiosClient'

const checkoutApi = {
    payment(data) {
        const url = '/checkout/payment'
        return axiosClient.post(url, data)
    },
}

export default checkoutApi
