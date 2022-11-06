import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usersApi from '../../../api/usersApi'
import LinearLoading from '../../../components/Loading/LinearLoading'
import ChangePasswordForm from '../components/ChangePasswordUserForm'

ChangePasswordUser.propTypes = {}

function ChangePasswordUser() {
    const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state?.userTemporary?.temporaryUser)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            const { message } = await usersApi.changePassword({
                ...user,
                password: values.newPassword,
            })

            toast.success(message, {
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/login'), 3000)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message, {
                autoClose: 2000,
                theme: 'colored',
            })
            setLoading(false)
            throw new Error(error)
        }

        setLoading(false)
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
                <ChangePasswordForm onSubmit={handleSubmit} />
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default ChangePasswordUser
