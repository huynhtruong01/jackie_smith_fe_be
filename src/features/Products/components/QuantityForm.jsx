import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import ButtonOrange from '../../../components/ButtonOrange'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { yupResolver } from '@hookform/resolvers/yup'
import QuantityField from '../../../components/formControls/QuantityField'

QuantityForm.propTypes = {}

function QuantityForm({ quantity = 1, onSubmit = null }) {
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

    const handleSubmit = async (value) => {
        try {
            if (!onSubmit) return
            await onSubmit(value)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
            <Box>
                <QuantityField name="quantity" form={form} />
            </Box>
            <ButtonOrange icon={ShoppingCartIcon} text="Add to cart" type="submit" />
        </Box>
    )
}

export default QuantityForm
