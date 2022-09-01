import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import StripeCheckout from 'react-stripe-checkout'
import { useSelector } from 'react-redux'
import ButtonOrange from '../../components/ButtonOrange'
import checkoutApi from '../../api/checkoutApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetCart } from '../Cart/cartSlice'
import { resetCheckout } from '../Checkout/checkoutSlice'
import cartsApi from '../../api/cartsApi'
import ordersApi from '../../api/ordersApi'
import { useEffect } from 'react'
import { orange } from '@mui/material/colors'
import { addTrackingOrder, addTrackingOrderUser } from '../TrackingOrder/trackingOrderSlice'

PaymentStripe.propTypes = {}

const STRIPE_KEY =
    'pk_test_51KMmrsINTCL3TOZ5xmgAWxxNrfYQeytblqVH9l1dos4kXMvAS31jIblcSWl5bBerkkflVIxxsZ8rs6x4sX0s3guD00sSHH1Lyl'

function PaymentStripe() {
    const [stripeToken, setStripeToken] = useState(null)
    const checkout = useSelector((state) => state.checkout.checkout)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const idCart = useSelector((state) => state.cart.id)
    const carts = useSelector((state) => state.cart.cartList)
    const user = useSelector((state) => state?.user2?.currentUser?.user)

    const onToken = (token) => {
        setStripeToken(token.id)
    }

    useEffect(() => {
        const handlePayment = async () => {
            if (!stripeToken) return

            try {
                const values = {
                    tokenId: stripeToken,
                    amount: Number(`${checkout.totalPrice}00`),
                }
                const { data, message } = await checkoutApi.payment(values)

                console.log(data)

                const orderItem = {
                    userId: user._id,
                    fullname: checkout.fullname,
                    email: checkout.email,
                    address: checkout.address,
                    phoneNumber: checkout.phoneNumber,
                    productList: carts,
                    totalPrice: checkout.totalPrice,
                    totalQuantity: checkout.totalQuantity,
                    isCheckout: true,
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

                // remove cart
                dispatch(resetCart())
                // remove checkout
                dispatch(resetCheckout())

                toast.success(message, {
                    autoClose: 2000,
                    theme: 'colored',
                })
                setTimeout(() => navigate('/'), 3000)
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message, {
                    autoClose: 2000,
                    theme: 'colored',
                })
            }
        }

        handlePayment()
    }, [stripeToken])

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            height="300px"
        >
            <Typography mb="12px">
                Please you click{' '}
                <Typography component="span" color={orange[500]}>
                    Pay with card
                </Typography>{' '}
                to payment
            </Typography>
            <StripeCheckout
                name="Jackie Smith Store"
                image="//cdn.shopify.com/s/files/1/0208/1956/files/A-JS-Favicon02-32x32_32x32.png?v=1588227038"
                billingAddress
                shippingAddress
                token={onToken}
                stripeKey={STRIPE_KEY}
                amount={Number(`${checkout.totalPrice}00`)}
            >
                <ButtonOrange text="Pay with card" />
            </StripeCheckout>
            <ToastContainer />
        </Box>
    )
}

export default PaymentStripe
