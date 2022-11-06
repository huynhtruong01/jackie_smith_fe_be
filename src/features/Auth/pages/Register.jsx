import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import authApi from '../../../api/authApi'
import LinearLoading from '../../../components/Loading/LinearLoading'
import RegisterForm from '../components/RegisterForm'

Register.propTypes = {}

function Register() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
        <Box
            sx={{
                position: 'relative',
                p: '24px 0 50px',
            }}
        >
            {loading && <LinearLoading />}
            <Box
                sx={{
                    width: '400px',
                    margin: 'auto',
                    p: '24px',
                    backgroundColor: '#fff',
                    boxShadow: `0 0 3px 3px ${grey[100]}`,
                    borderRadius: '5px',
                }}
            >
                <RegisterForm onSubmit={handleSubmit} />
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default Register
