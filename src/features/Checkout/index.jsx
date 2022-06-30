import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import CheckoutForm from './components/CheckoutForm'
import { grey } from '@mui/material/colors'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addCheckout } from './checkoutSlice'
import { useNavigate } from 'react-router-dom'

Checkout.propTypes = {}

function Checkout(props) {
    const checkoutValue = useSelector((state) => state.checkout.checkout)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log(checkoutValue)
    const handleSubmit = async (values) => {
        try {
            dispatch(addCheckout({ ...checkoutValue, ...values }))
            // check type checkout
            if (values.typeCheckout === 'payment online') {
                // navigate payment
                navigate('/payment-online')
            } else {
                // payment directly
                navigate('/payment-directly')
            }
        } catch (error) {
            console.log(error)
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
                <CheckoutForm values={checkoutValue} onSubmit={handleSubmit} />
            </Box>
        </Box>
    )
}

export default Checkout
