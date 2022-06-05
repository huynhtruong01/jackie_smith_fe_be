import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    IconButton,
    InputAdornment,
    FormHelperText,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Controller } from 'react-hook-form'

PasswordField.propTypes = {}

function PasswordField({ name, label, form, placeholder = '' }) {
    const [showPassword, setShowPassword] = useState(false)
    const { control, formState } = form
    const error = formState.errors[name]

    const handleShowPasswordClick = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <Box m="16px 0">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <FormControl fullWidth variant="outlined" error={!!error}>
                        <InputLabel htmlFor="password">{label}</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={value}
                            onChange={onChange}
                            label={label}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPasswordClick}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>{error?.message}</FormHelperText>
                    </FormControl>
                )}
            />
        </Box>
    )
}

export default PasswordField
