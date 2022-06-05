import React from 'react'
import PropTypes from 'prop-types'
import { Box, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

InputField.propTypes = {}

function InputField({ name, label, form, placeholder = '' }) {
    const { control, formState } = form
    const error = formState.errors[name]

    return (
        <Box m="16px 0">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        label={label}
                        placeholder={placeholder}
                        error={!!error}
                        helperText={error?.message}
                        fullWidth
                    />
                )}
            />
        </Box>
    )
}

export default InputField
