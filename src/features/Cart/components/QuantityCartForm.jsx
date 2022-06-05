import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import QuantityCartField from '../../../components/formControls/QuantityFieldCart'
import { updateQuantity } from '../cartSlice'

QuantityCartForm.propTypes = {}

function QuantityCartForm({ id, quantity = 1, onSubmit = null }) {
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        quantity: yup
            .number()
            .required('Please enter quantity')
            .typeError('Quantity must be number'),
    })

    const form = useForm({
        defaultValues: {
            quantity,
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async ({ quantity }) => {
        if (!onSubmit) return
        try {
            await onSubmit(quantity)

            // update quantity into redux
            const cartItem = {
                id,
                quantity,
            }
            dispatch(updateQuantity(cartItem))
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
            <Box>
                <QuantityCartField name="quantity" form={form} />
            </Box>
        </Box>
    )
}

export default QuantityCartForm
