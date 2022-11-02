import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
    Box,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material'
import { orange } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

PasswordField.propTypes = {}

function PasswordField({ name, label, form, placeholder = '', disabled = false }) {
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
                        <InputLabel
                            htmlFor="password"
                            sx={{
                                '&.Mui-focused': {
                                    color: orange[500],
                                },
                            }}
                        >
                            {label}
                        </InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={value}
                            onChange={onChange}
                            label={label}
                            disabled={disabled}
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
                            sx={{
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: orange[500],
                                },
                            }}
                        />
                        <FormHelperText>{error?.message}</FormHelperText>
                    </FormControl>
                )}
            />
        </Box>
    )
}

export default PasswordField
