import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import ButtonOrange from '../../../components/ButtonOrange'
import PasswordField from '../../../components/formControls/PasswordField'

ChangePasswordForm.propTypes = {}

function ChangePasswordForm({ onSubmit = null }) {
    const schema = yup.object().shape({
        newPassword: yup
            .string()
            .required('Please enter new password')
            .min(6, 'Please enter new password at least six characters')
            .max(20, 'Please enter new password maximum twenty characters'),
        confirmPassword: yup
            .string()
            .required('Please enter confirm password')
            .oneOf([yup.ref('newPassword')], 'Password is not match'),
    })

    const form = useForm({
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
        try {
            console.log(values)
            if (!onSubmit) return
            await onSubmit(values)
            form.reset()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
            <Typography
                mb="24px"
                textAlign="center"
                sx={{
                    textTransform: 'uppercase',
                    fontSize: '1.2rem',
                    color: orange[600],
                    fontWeight: 500,
                    mb: '32px',
                }}
            >
                Change password
            </Typography>
            <Box mb="20px">
                <PasswordField name="newPassword" label="New password" form={form} />
                <PasswordField name="confirmPassword" label="Confirm password" form={form} />
            </Box>
            <ButtonOrange fullWidth text="Change password" type="submit" />
            <Box
                textAlign="center"
                mt="20px"
                sx={{
                    a: {
                        color: grey[500],
                        '&:hover': {
                            color: orange[600],
                            textDecoration: 'underline',
                        },
                    },
                }}
            >
                <Link to="/">Back to home page</Link>
            </Box>
        </Box>
    )
}

export default ChangePasswordForm
