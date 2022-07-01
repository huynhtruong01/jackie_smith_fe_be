import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cartsApi from '../../api/cartsApi'
import ordersApi from '../../api/ordersApi'
import { resetCart } from '../Cart/cartSlice'
import { resetCheckout } from '../Checkout/checkoutSlice'
import { useNavigate, Link } from 'react-router-dom'
import { orange } from '@mui/material/colors'

PaymentDirectly.propTypes = {}

function PaymentDirectly() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const checkoutValues = useSelector((state) => state.checkout.checkout)
    const idCart = useSelector((state) => state.cart.id)
    const carts = useSelector((state) => state.cart.cartList)
    const user = useSelector((state) => state?.user2?.currentUser?.user)

    useEffect(() => {
        const handleOrder = async () => {
            if (!idCart) return
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

        handleOrder()
    }, [])

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Typography width="550px" textAlign="center">
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
            <ToastContainer />
        </Box>
    )
}

export default PaymentDirectly
