import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import ButtonOrange from '../../../components/ButtonOrange'
import PasswordField from '../../../components/formControls/PasswordField'

ChangePasswordUserForm.propTypes = {}

function ChangePasswordUserForm({ onSubmit = null }) {
    const schema = yup.object().shape({
        newPassword: yup
            .string()
            .required('Please enter new password')
            .min(6, 'Please enter new password least six characters')
            .max(20, 'Please enter new password maximum twenty characters'),
        confirmPassword: yup
            .string()
            .required('Please enter confirm password')
            .oneOf(
                [yup.ref('newPassword')],
                'Please enter confirm password must be equal new password'
            ),
    })

    const form = useForm({
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
        if (!onSubmit) return

        try {
            await onSubmit(values)
        } catch (error) {
            console.log(error)
            toast.error(error, {
                autoClose: 2000,
                theme: 'colored',
            })
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
                Change password
            </Typography>
            <Box>
                <PasswordField
                    name="newPassword"
                    form={form}
                    label="New Password"
                    disabled={form.formState.isSubmitting}
                />
                <PasswordField
                    name="confirmPassword"
                    form={form}
                    label="Confirm Password"
                    disabled={form.formState.isSubmitting}
                />
            </Box>
            <ButtonOrange
                disabled={form.formState.isSubmitting}
                type="submit"
                text="Change password"
                fullWidth
            />
        </Box>
    )
}

export default ChangePasswordUserForm
