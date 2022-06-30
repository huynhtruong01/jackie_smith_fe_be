import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import ChangeInfoForm from './components/ChangeInfoForm'
import usersApi from '../../api/usersApi'
import { loginAndSaveUser } from '../Auth/userSlice'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

ChangeInfo.propTypes = {}

function ChangeInfo(props) {
    const user = useSelector((state) => state.user2?.currentUser.user)
    const currentUser = useSelector((state) => state.user2?.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const values = {
        fullname: user.fullname,
        email: user.email,
    }

    const handleSubmit = async (values) => {
        try {
            // update user
            const userUpdate = await usersApi.update({ ...user, ...values })
            console.log(userUpdate)

            // update user in redux
            dispatch(
                loginAndSaveUser({
                    ...currentUser,
                    user: userUpdate.user,
                })
            )

            // back home page
            toast.success('Change information successfully 😁😆', {
                autoClose: 2000,
                theme: 'colored',
            })
            setTimeout(() => navigate('/'), 3000)
        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <Box pt="50px">
            <Box
                backgroundColor="#fff"
                width="400px"
                margin="auto"
                p="16px 16px 20px"
                borderRadius="5px"
            >
                <ChangeInfoForm values={values} onSubmit={handleSubmit} />
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default ChangeInfo
