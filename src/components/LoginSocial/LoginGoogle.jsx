import { Box } from '@mui/material'
import { gapi } from 'gapi-script'
import { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import authApi from '../../api/authApi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginAndSaveUser } from '../../features/Auth/userSlice'
import cartsApi from '../../api/cartsApi'
import { getCartFromDB, getIdCartFromDB } from '../../features/Cart/cartSlice'
import ordersApi from '../../api/ordersApi'
import { addTrackingOrder } from '../../features/TrackingOrder/trackingOrderSlice'

LoginGoogle.propTypes = {}

function LoginGoogle() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const clientId = '479944495978-h95k7v5ug7lc707sjk3ou7oqgoj149cm.apps.googleusercontent.com'

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: '',
            })
        }

        gapi.load('client:auth2', start)
    }, [])

    const handleSuccess = async (res) => {
        try {
            // console.log(res)
            const { profileObj } = res
            const user = {
                fullname: profileObj.name,
                email: profileObj.email,
            }

            // save db login google
            const userDB = await authApi.loginGoogle(user)
            // get cart from db
            const cart = await cartsApi.getByUserId(userDB.user._id)
            console.log(cart)

            if (cart) {
                const cartList = cart.items.map((x) => ({
                    id: x._id,
                    product: x.product,
                    quantity: x.quantity,
                    size: x.size,
                }))
                dispatch(getCartFromDB(cartList))
                dispatch(getIdCartFromDB(cart._id))
            }

            // save tracking order redux
            const { orders } = await ordersApi.getAllByUserId({ userId: userDB?.user?._id })
            console.log(orders)
            dispatch(addTrackingOrder(orders))

            console.log(userDB)
            // save local storage
            dispatch(loginAndSaveUser(userDB))
            // redirect home page
            toast.success(userDB.message, {
                autoClose: 2000,
                theme: 'colored',
            })
            setTimeout(() => navigate('/'), 3000)
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
                theme: 'colored',
            })
            console.log(error)
        }
    }

    const handleFail = (res) => {
        console.log(res)
    }

    return (
        <Box
            sx={{
                '.btn-google': {
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    mb: '8px',
                },
            }}
        >
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with google"
                onSuccess={handleSuccess}
                onFailure={handleFail}
                cookiePolicy={'single_host_origin'}
                scope="profile"
                className="btn-google"
            />
            <ToastContainer />
        </Box>
    )
}

export default LoginGoogle
