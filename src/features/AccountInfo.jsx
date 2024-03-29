import KeyIcon from '@mui/icons-material/Key'
import SettingsIcon from '@mui/icons-material/Settings'
import { Avatar, Box, TextField, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import React, { useEffect } from 'react'
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
    const { _id, createdAt, updatedAt, role, __v, password, id, ...newUser } = user

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Box pt="50px">
            <Box
                backgroundColor="#fff"
                borderRadius="5px"
                width="700px"
                margin="auto"
                p="24px 16px"
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: '30px',
                    }}
                >
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
                        <Typography
                            variant="body1"
                            component="span"
                            sx={{
                                color: orange[700],
                                fontWeight: 'bold',
                                fontSize: '1.4rem',
                            }}
                        >
                            Hi {getNameUser(user?.fullname)}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: grey[500],
                                fontSize: '.9rem',
                            }}
                        >
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Box mr="8px">
                        <Link to="/change-password">
                            <ButtonOrange icon={KeyIcon} text="Change password" />
                        </Link>
                    </Box>
                    <Box>
                        <Link to="/setting-account">
                            <ButtonOrange icon={SettingsIcon} text="Edit account" />
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AccountInfo
