import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import authApi from '../../../api/authApi'
import cartsApi from '../../../api/cartsApi'
import ordersApi from '../../../api/ordersApi'
import { getCartFromDB, getIdCartFromDB } from '../../Cart/cartSlice'
import { addTrackingOrder, addTrackingOrderUser } from '../../TrackingOrder/trackingOrderSlice'
import LoginForm from '../components/LoginForm'
import { loginAndSaveUser } from '../userSlice'

Login.propTypes = {}

const roleList = ['employee']

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (value) => {
        try {
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
            throw new Error(error?.response?.data?.message || error.message)
        }
    }

    return (
        <Box p="24px 0 50px">
            <Box
                width="400px"
                margin="auto"
                p="12px"
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
