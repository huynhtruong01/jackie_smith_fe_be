import { Box, LinearProgress } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usersApi from '../../../api/usersApi'
import ForgotPasswordForm from '../components/ForgotPasswordForm'
import { saveUser } from '../userTemporarySlice'

ForgotPassword.propTypes = {}

function ForgotPassword() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (values) => {
        try {
            setLoading(true)

            const { user } = await usersApi.checkEmail(values)
            console.log(user)
            dispatch(saveUser(user))

            setTimeout(() => navigate('/change-password-account'), 2000)
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }

        setLoading(false)
    }

    return (
        <Box position="relative">
            {loading && (
                <LinearProgress
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        backgroundColor: orange[100],
                        span: {
                            backgroundColor: orange[700],
                        },
                    }}
                />
            )}
            <Box p="28px 0 50px">
                <Box
                    width="400px"
                    margin="auto"
                    p="12px"
                    backgroundColor="#fff"
                    boxShadow={`0 0 3px 3px ${grey[100]}`}
                    borderRadius="5px"
                >
                    <ForgotPasswordForm onSubmit={handleSubmit} />
                </Box>
                <ToastContainer />
            </Box>
        </Box>
    )
}

export default ForgotPassword
