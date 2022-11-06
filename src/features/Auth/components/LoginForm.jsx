import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import ButtonOrange from '../../../components/ButtonOrange'
import InputField from '../../../components/formControls/InputField'
import PasswordField from '../../../components/formControls/PasswordField'
import LoginFacebook from '../../../components/LoginSocial/LoginFacebook'
import LoginGoogle from '../../../components/LoginSocial/LoginGoogle'

LoginForm.propTypes = {}

function LoginForm({ onSubmit = null }) {
    const schema = yup.object().shape({
        email: yup.string().required('Please enter email').email('Invalid email'),
        password: yup
            .string()
            .required('Please enter password')
            .min(6, 'Please enter password least six characters')
            .max(20, 'Please enter password maximum twenty characters'),
    })

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (value) => {
        if (!onSubmit) return
        try {
            await onSubmit(value)
            form.reset()
        } catch (error) {
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
                SIGN IN
            </Typography>
            <Box>
                <InputField
                    name="email"
                    label="Email"
                    form={form}
                    placeholder="abc@gmail.com"
                    disabled={form.formState.isSubmitting}
                />
                <PasswordField
                    name="password"
                    label="Password"
                    form={form}
                    disabled={form.formState.isSubmitting}
                />
            </Box>
            <Box
                sx={{
                    mb: '16px',
                    textAlign: 'right',
                    a: {
                        color: orange[600],

                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    },
                }}
            >
                <Link to="/forgot-password">
                    <Typography fontSize="0.9rem">Forgot password?</Typography>
                </Link>
            </Box>
            <ButtonOrange
                text="Login"
                disabled={form.formState.isSubmitting}
                fullWidth
                type="submit"
                fontSize="1.1rem"
            />
            <Box
                mt="8px"
                mb="16px"
                textAlign="right"
                sx={{
                    a: {
                        color: orange[600],

                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    },
                }}
            ></Box>
            <Box width="100%">
                <LoginGoogle />
                {/* <LoginFacebook /> */}
            </Box>
            <Box mt="8px" textAlign="center">
                <Typography
                    sx={{
                        color: grey[700],
                        fontSize: '14px',
                        a: {
                            display: 'inline',
                            color: orange[400],
                            fontWeight: 600,

                            '&:hover': {
                                color: orange[600],
                                textDecoration: 'underline',
                            },
                        },
                    }}
                >
                    Dont't have an account? <Link to="/register">Register</Link>
                </Typography>
            </Box>
        </Box>
    )
}

export default LoginForm
