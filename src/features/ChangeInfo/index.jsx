import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usersApi from '../../api/usersApi'
import { loginAndSaveUser } from '../Auth/userSlice'
import ChangeInfoForm from './components/ChangeInfoForm'

ChangeInfo.propTypes = {}

function ChangeInfo() {
    const user = useSelector((state) => state.user2?.currentUser.user)
    const currentUser = useSelector((state) => state.user2?.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const values = {
        fullname: user.fullname,
        email: user.email,
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
