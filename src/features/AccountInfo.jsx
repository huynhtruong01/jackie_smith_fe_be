import KeyIcon from '@mui/icons-material/Key'
import SettingsIcon from '@mui/icons-material/Settings'
import { Avatar, Box, TextField, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ButtonOrange from '../components/ButtonOrange'
import { getNameUser } from '../utils/common'

AccountInfo.propTypes = {}

const userObj = {
    fullname: 'Full name',
    email: 'Email',
    phoneNumber: 'Phone number',
    address: 'Address',
}

function AccountInfo() {
    const user = useSelector((state) => state.user2.currentUser.user)
    const { _id, createdAt, updatedAt, role, __v, ...newUser } = user

    return (
        <Box pt="50px">
            <Box
                backgroundColor="#fff"
                borderRadius="5px"
                width="700px"
                margin="auto"
                p="16px 12px 20px"
            >
                <Box display="flex" justifyContent="center" mb="30px">
                    <Box mr="12px">
                        <Avatar
                            sx={{
                                width: '50px',
                                height: '50px',
                                bgcolor: orange[500],
                                fontSize: '1.5rem',
                            }}
                        >
                            {getNameUser(user?.fullname).toString()[0]}
                        </Avatar>
                    </Box>
                    <Box>
                        <Typography variant="h4" component="h3" color={orange[700]}>
                            Hi {getNameUser(user?.fullname)}
                        </Typography>
                        <Typography variant="body1" color={grey[500]}>
                            Welcome to your account
                        </Typography>
                    </Box>
                </Box>
                <Box mb="24px">
                    <Box
                        display="flex"
                        gap="18px"
                        sx={{
                            flexFlow: 'row wrap',
                        }}
                    >
                        {Object.keys(newUser)?.map((input) => {
                            return (
                                <Box width="calc(100%/2 - 10px)" key={input}>
                                    <TextField
                                        fullWidth
                                        label={userObj[input]}
                                        disabled
                                        value={user[input]}
                                    />
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
                <Box display="flex">
                    <Box mr="8px">
                        <Link to="/change-password">
                            <ButtonOrange icon={KeyIcon} text="Change password" />
                        </Link>
                    </Box>
                    <Box>
                        <Link to="/setting-account">
                            <ButtonOrange icon={SettingsIcon} text="Setting account" />
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AccountInfo
