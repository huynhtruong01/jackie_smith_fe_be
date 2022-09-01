import { Box, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cartsApi from '../../api/cartsApi'
import ordersApi from '../../api/ordersApi'
import ButtonOrange from '../../components/ButtonOrange'
import { resetCart } from '../Cart/cartSlice'
import { resetCheckout } from '../Checkout/checkoutSlice'
import { addTrackingOrder, addTrackingOrderUser } from '../TrackingOrder/trackingOrderSlice'

PaymentDirectly.propTypes = {}

function PaymentDirectly() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const checkoutValues = useSelector((state) => state.checkout.checkout)
    const idCart = useSelector((state) => state.cart.id)
    const carts = useSelector((state) => state.cart.cartList)
    const user = useSelector((state) => state?.user2?.currentUser?.user)

    // useEffect(() => {
    //     if (!idCart && carts.length === 0 && Object.keys(checkoutValues).length === 0) return
    //     handleOrder()
    // }, [])

    const handleOrder = async () => {
        try {
            const orderItem = {
                userId: user._id,
                fullname: checkoutValues.fullname,
                email: checkoutValues.email,
                address: checkoutValues.address,
                phoneNumber: checkoutValues.phoneNumber,
                productList: carts,
                totalPrice: checkoutValues.totalPrice,
                totalQuantity: checkoutValues.totalQuantity,
                isCheckout: false,
                mode: 'approves',
            }

            console.log(idCart)

            // remove cart database
            await cartsApi.remove(idCart)
            // add order database
            await ordersApi.add(orderItem)

            // save tracking order when select type payment
            const { orders } = await ordersApi.getAllByUserId({ userId: user._id })
            dispatch(addTrackingOrderUser(orders))

            console.log(orders)

            // remove cart
            dispatch(resetCart())
            // remove checkout
            dispatch(resetCheckout())

            toast.success('Orders will be paid directly when you receive orders', {
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/'), 3000)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message, {
                autoClose: 2000,
                theme: 'colored',
            })
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="300px"
        >
            <Typography width="550px" textAlign="center" mb="16px">
                Your order will pay directly when you receive your order. Thank you for buying the
                product at our store. Back to{' '}
                <Typography
                    component="span"
                    sx={{
                        a: {
                            color: orange[400],

                            '&:hover': {
                                color: orange[600],
                                textDecoration: 'underline',
                            },
                        },
                    }}
                >
                    <Link to="/">home</Link>
                </Typography>
            </Typography>
            <Box onClick={handleOrder}>
                <ButtonOrange text="Payment" />
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default PaymentDirectly
