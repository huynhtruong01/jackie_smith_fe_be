import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usersApi from '../../../api/usersApi'
import ChangePasswordForm from '../components/ChangePasswordUserForm'

ChangePasswordUser.propTypes = {}

function ChangePasswordUser() {
    const user = useSelector((state) => state?.userTemporary?.temporaryUser)
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        try {
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
            throw new Error(error)
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
                <ChangePasswordForm onSubmit={handleSubmit} />
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default ChangePasswordUser
