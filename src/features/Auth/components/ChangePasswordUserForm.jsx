import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import PasswordField from '../../../components/formControls/PasswordField'
import { toast } from 'react-toastify'
import ButtonOrange from '../../../components/ButtonOrange'

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
                component="h2"
                variant="h5"
                textAlign="center"
                fontWeight="500"
                color={orange[500]}
            >
                Change password
            </Typography>
            <Box>
                <PasswordField name="newPassword" form={form} label="New Password" />
                <PasswordField name="confirmPassword" form={form} label="Confirm Password" />
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
