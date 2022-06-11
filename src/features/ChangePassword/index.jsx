import { Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usersApi from '../../api/usersApi'
import ChangePasswordForm from './components/ChangePasswordForm'

ChangePassword.propTypes = {}

function ChangePassword(props) {
    const user = useSelector((state) => state.user2.currentUser.user)
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        try {
            await usersApi.update({ ...user, password: values.newPassword })
            toast.success('Change password successfully 😁😆', {
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/'), 3000)
        } catch (error) {
            toast.error('Change password failed 😥😥', {
                autoClose: 2000,
                theme: 'colored',
            })
            throw new Error(error)
        }
    }

    return (
        <Box pt="50px">
            <Box
                backgroundColor="#fff"
                width="400px"
                margin="auto"
                p="16px 12px 20px"
                borderRadius="5px"
            >
                <ChangePasswordForm onSubmit={handleSubmit} />
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default ChangePassword
