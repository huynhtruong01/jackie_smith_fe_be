import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usersApi from '../../api/usersApi'
import LinearLoading from '../../components/Loading/LinearLoading'
import { loginAndSaveUser } from '../Auth/userSlice'
import ChangeInfoForm from './components/ChangeInfoForm'

ChangeInfo.propTypes = {}

function ChangeInfo() {
    const [loading, setLoading] = useState(false)
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
            setLoading(true)
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
                <ChangeInfoForm values={values} onSubmit={handleSubmit} />
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default ChangeInfo
