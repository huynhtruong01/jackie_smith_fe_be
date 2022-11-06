import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usersApi from '../../api/usersApi'
import LinearLoading from '../../components/Loading/LinearLoading'
import ChangePasswordForm from './components/ChangePasswordForm'

ChangePassword.propTypes = {}

function ChangePassword(props) {
    const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state?.user2?.currentUser.user)
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        try {
            setLoading(true)
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

        setLoading(false)
    }

    return (
        <Box
            sx={{
                position: 'relative',
                pt: '50px',
            }}
        >
            {loading && <LinearLoading />}
            <Box backgroundColor="#fff" width="400px" margin="auto" p="24px" borderRadius="5px">
                <ChangePasswordForm onSubmit={handleSubmit} />
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default ChangePassword
