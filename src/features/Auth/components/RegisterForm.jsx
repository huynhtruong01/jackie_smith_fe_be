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
        address: yup.string().required('Please enter address'),
        phoneNumber: yup
            .number()
            .required('Please enter phone number')
            .typeError('Phone number must be number'),
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
            address: '',
            phoneNumber: '',
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
                <InputField
                    name="address"
                    label="Address"
                    form={form}
                    placeholder="448 Le Van Viet, Tang Nhon Phu A, Thu Duc city"
                />
                <InputField
                    name="phoneNumber"
                    label="Phone Number"
                    form={form}
                    placeholder="0908765432"
                />
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="confirmPassword" label="Confirm Password" form={form} />
            </Box>
            <ButtonOrange text="Register" fullWidth type="submit" fontSize="1.1rem" />
            <Box mt="16px">
                <Typography
                    sx={{
                        color: grey[700],
                        a: {
                            display: 'inline',
                        },
                    }}
                >
                    Already have an account?{' '}
                    <Typography
                        component="span"
                        sx={{
                            a: {
                                color: orange[400],
                                fontWeight: 600,

                                '&:hover': {
                                    color: orange[600],
                                    textDecoration: 'underline',
                                },
                            },
                        }}
                    >
                        <Link to="/login">Login</Link>
                    </Typography>
                </Typography>
            </Box>
        </Box>
    )
}

export default RegisterForm
