import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import ButtonOrange from '../../../components/ButtonOrange'
import InputField from '../../../components/formControls/InputField'

ForgotPasswordForm.propTypes = {}

function ForgotPasswordForm({ onSubmit = null }) {
    const schema = yup.object().shape({
        email: yup.string().required('Please enter your email').email('Invalid email'),
    })

    const form = useForm({
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
        if (!onSubmit) return

        try {
            await onSubmit(values)
        } catch (error) {
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
                Confirm your email
            </Typography>
            <InputField name="email" form={form} label="Email" placeholder="abc@gmail.com" />
            <ButtonOrange type="submit" text="Check email" fullWidth />
        </Box>
    )
}

export default ForgotPasswordForm
