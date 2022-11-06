import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import authApi from '../../../api/authApi'
import cartsApi from '../../../api/cartsApi'
import ordersApi from '../../../api/ordersApi'
import LinearLoading from '../../../components/Loading/LinearLoading'
import { getCartFromDB, getIdCartFromDB } from '../../Cart/cartSlice'
import { addTrackingOrderUser } from '../../TrackingOrder/trackingOrderSlice'
import LoginForm from '../components/LoginForm'
import { loginAndSaveUser } from '../userSlice'

Login.propTypes = {}

const roleList = ['employee']

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = async (value) => {
        try {
            setLoading(true)

            const user = await authApi.login(value)
            const cart = await cartsApi.getByUserId(user.user._id)
            // console.log(user.user.role)

            if (roleList.includes(user?.user?.role))
                throw new Error('Not allow employee go to website shopping. Please sign up.')

            // console.log(cart)
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

            // save user in redux
            dispatch(loginAndSaveUser(user))

            // save tracking order list redux
            const { orders } = await ordersApi.getAllByUserId({ userId: user._id })
            console.log(orders)
            dispatch(addTrackingOrderUser(orders))

            // save cart from db into redux

            toast.success(user.message, {
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/'), 3000)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message, {
                autoClose: 2000,
                theme: 'colored',
            })
            setLoading(false)
            throw new Error(error?.response?.data?.message || error.message)
        }
        setLoading(false)
    }

    return (
        <Box
            sx={{
                position: 'relative',
                p: '24px 0 50px',
            }}
        >
            {loading && <LinearLoading />}
            <Box
                width="400px"
                margin="auto"
                p="24px"
                backgroundColor="#fff"
                boxShadow={`0 0 3px 3px ${grey[100]}`}
                borderRadius="5px"
            >
                <LoginForm onSubmit={handleSubmit} />
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default Login
