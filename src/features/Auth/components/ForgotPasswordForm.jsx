import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
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
            toast.error(error.message, {
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
                Confirm your email
            </Typography>
            <InputField
                name="email"
                form={form}
                label="Email"
                placeholder="abc@gmail.com"
                disabled={form.formState.isSubmitting}
            />
            <ButtonOrange
                disabled={form.formState.isSubmitting}
                type="submit"
                text="Check email"
                fullWidth
            />
            <ToastContainer />
        </Box>
    )
}

export default ForgotPasswordForm
