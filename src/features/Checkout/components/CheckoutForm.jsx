import React from 'react'
import PropTypes from 'prop-types'
import { Box, TextField, Typography } from '@mui/material'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import TextAreaField from '../../../components/formControls/TextAreaField'
import { yupResolver } from '@hookform/resolvers/yup'
import ButtonOrange from '../../../components/ButtonOrange'
import { orange } from '@mui/material/colors'
import RadioField from '../../../components/formControls/RadioField'
import NumberField from '../../../components/formControls/NumberField'

CheckoutForm.propTypes = {}

const data = [
    {
        value: 'payment directly',
        label: 'Payment directly',
    },
    {
        value: 'payment online',
        label: 'Payment online',
    },
]

function CheckoutForm({ values, onSubmit = null }) {
    const schema = yup.object().shape({
        address: yup.string().required('Please enter your address'),
        phoneNumber: yup
            .string()
            .required('Please enter your phone number')
            .test(
                'check-length',
                'Please enter your phone number least nine number or maximum eleven number',
                (value) => value.toString().length >= 9 && value.toString().length <= 11
            ),
        typeCheckout: yup.string().required('Please choose type checkout'),
    })

    const form = useForm({
        defaultValues: {
            address: '',
            phoneNumber: '',
            typeCheckout: data[0].value,
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
        if (!onSubmit) return

        try {
            await onSubmit(values)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
            <Typography
                component="h2"
                variant="h5"
                textAlign="center"
                fontWeight="500"
                color={orange[500]}
            >
                Checkout
            </Typography>
            <Box>
                <Box
                    sx={{
                        m: '16px 0',
                    }}
                >
                    <TextField label="Full Name" value={values.fullname} fullWidth />
                </Box>
                <Box
                    sx={{
                        m: '16px 0',
                    }}
                >
                    <TextField label="Email" value={values.email} fullWidth disabled />
                </Box>
                <TextAreaField
                    name="address"
                    label="Address"
                    form={form}
                    placeholder="448 Le Van Viet, Tang Nhon Phu A, Thu Duc city"
                />
                <NumberField
                    name="phoneNumber"
                    label="Phone Number"
                    form={form}
                    placeholder="0908634683"
                />
                <Box
                    sx={{
                        m: '16px 0',
                    }}
                >
                    <TextField
                        label="Total Quantity"
                        value={values.totalQuantity}
                        fullWidth
                        disabled
                    />
                </Box>
                <Box
                    sx={{
                        m: '16px 0',
                    }}
                >
                    <TextField label="Total Price" value={values.totalPrice} fullWidth disabled />
                </Box>
                <RadioField
                    name="typeCheckout"
                    form={form}
                    label="Choose mode of checkout"
                    data={data}
                />
            </Box>
            <ButtonOrange type="submit" text="Checkout" fullWidth />
        </Box>
    )
}

export default CheckoutForm
