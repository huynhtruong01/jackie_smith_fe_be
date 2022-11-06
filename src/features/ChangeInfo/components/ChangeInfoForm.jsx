import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import ButtonOrange from '../../../components/ButtonOrange'
import InputField from '../../../components/formControls/InputField'

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
                component="h3"
                variant="h5"
                sx={{
                    textTransform: 'uppercase',
                    fontSize: '1.2rem',
                    color: orange[600],
                    fontWeight: 600,
                    mb: '24px',
                    textAlign: 'center',
                }}
            >
                Change information
            </Typography>
            <Box mb="20px">
                <InputField
                    name="fullname"
                    label="Full Name"
                    placeholder="Nguyen Van A"
                    form={form}
                    disabled={form.formState.isSubmitting}
                />
                <InputField
                    name="email"
                    label="Email"
                    placeholder="anguyen@gmail.com"
                    form={form}
                    disabled={form.formState.isSubmitting}
                />
            </Box>
            <ButtonOrange
                disabled={form.formState.isSubmitting}
                fullWidth
                type="submit"
                text="Change"
            />
        </Box>
    )
}

export default ChangeInfoForm
