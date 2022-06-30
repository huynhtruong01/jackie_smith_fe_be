import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import ButtonOrange from '../../../components/ButtonOrange'
import InputField from '../../../components/formControls/InputField'
import NumberField from '../../../components/formControls/NumberField'
import PasswordField from '../../../components/formControls/PasswordField'

RegisterForm.propTypes = {}

function RegisterForm({ onSubmit = null }) {
    const schema = yup.object().shape({
        fullname: yup
            .string()
            .required('Please enter full name')
            .test(
                'at-least-two-words',
                'Please enter full name least two words',
                (value) => value.split(' ').filter((x) => !!x && x.length >= 2).length >= 2
            ),
        email: yup.string().required('Please enter email').email('Invalid email'),
        password: yup
            .string()
            .required('Please enter password')
            .min(6, 'Please enter password least six characters')
            .max(20, 'Please enter password maximum twenty characters'),
        confirmPassword: yup
            .string()
            .required('Please enter confirm password')
            .oneOf([yup.ref('password')], 'Please enter confirm password equal password'),
    })

    const form = useForm({
        defaultValues: {
            fullname: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (value) => {
        if (!onSubmit) return

        try {
            await onSubmit(value)
            form.reset()
        } catch (error) {
            console.log('Error: ', error)
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
                Register
            </Typography>
            <Box>
                <InputField
                    name="fullname"
                    label="Full Name"
                    form={form}
                    placeholder="Nguyen Van A"
                />
                <InputField name="email" label="Email" form={form} placeholder="abc@gmail.com" />
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="confirmPassword" label="Confirm Password" form={form} />
            </Box>
            <ButtonOrange
                disabled={form.formState.isSubmitting}
                text="Register"
                fullWidth
                type="submit"
                fontSize="1.1rem"
            />
            <Box mt="32px" textAlign="center">
                <Typography
                    sx={{
                        color: grey[700],
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
                    Already have an account?{' '}
                    <Link to="/login">
                        <Typography component="span">Login</Typography>
                    </Link>
                </Typography>
            </Box>
        </Box>
    )
}

export default RegisterForm
