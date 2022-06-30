import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from '../../../components/formControls/InputField'
import ButtonOrange from '../../../components/ButtonOrange'
import { Box, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import { toast } from 'react-toastify'

ChangeInfoForm.propTypes = {}

function ChangeInfoForm({ values, onSubmit = null }) {
    const schema = yup.object().shape({
        fullname: yup
            .string()
            .required('Please enter full name')
            .test(
                'at-least-two-words',
                'Please enter full name at least two words',
                (value) => value.split(' ').filter((x) => !!x && x.length >= 2).length >= 2
            ),
        email: yup.string().required('Please enter email').email('Invalid email'),
    })

    const form = useForm({
        defaultValues: {
            fullname: values.fullname,
            email: values.email,
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
        if (!onSubmit) return
        try {
            await onSubmit(values)
            form.reset()
        } catch (error) {
            toast.error('Change information failed', {
                autoClose: 2000,
                theme: 'colored',
            })
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
                mb="32px"
            >
                Change information
            </Typography>
            <Box mb="20px">
                <InputField
                    name="fullname"
                    label="Full Name"
                    placeholder="Nguyen Van A"
                    form={form}
                />
                <InputField
                    name="email"
                    label="Email"
                    placeholder="anguyen@gmail.com"
                    form={form}
                />
            </Box>
            <ButtonOrange fullWidth type="submit" text="Change" />
        </Box>
    )
}

export default ChangeInfoForm
