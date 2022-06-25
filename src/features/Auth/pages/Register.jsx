import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import authApi from '../../../api/authApi'
import RegisterForm from '../components/RegisterForm'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

Register.propTypes = {}

function Register() {
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        try {
            const { message } = await authApi.register(values)

            toast.success(message, {
                autoClose: 2000,
                theme: 'colored',
            })
            setTimeout(() => navigate('/login'), 3000)
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
                theme: 'colored',
            })
            throw new Error(error.response.data.message)
        }
    }

    return (
        <Box p="24px 0 50px">
            <Box
                width="400px"
                margin="auto"
                p="12px"
                backgroundColor="#fff"
                boxShadow={`0 0 3px 3px ${grey[100]}`}
                borderRadius="5px"
            >
                <RegisterForm onSubmit={handleSubmit} />
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default Register
