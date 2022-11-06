import { Box, LinearProgress } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usersApi from '../../../api/usersApi'
import LinearLoading from '../../../components/Loading/LinearLoading'
import ForgotPasswordForm from '../components/ForgotPasswordForm'
import { saveUser } from '../userTemporarySlice'

ForgotPassword.propTypes = {}

function ForgotPassword() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = async (values) => {
        try {
            setLoading(true)

            const { user } = await usersApi.checkEmail(values)
            console.log(user)
            dispatch(saveUser(user))

            navigate('/change-password-account')
        } catch (error) {
            setLoading(false)
            throw new Error(error)
        }

        setLoading(false)
    }

    return (
        <Box position="relative">
            {loading && <LinearLoading />}
            <Box p="28px 0 50px">
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
                    <ForgotPasswordForm onSubmit={handleSubmit} />
                </Box>
                <ToastContainer />
            </Box>
        </Box>
    )
}

export default ForgotPassword
