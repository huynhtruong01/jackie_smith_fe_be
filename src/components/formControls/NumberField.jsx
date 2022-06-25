import { Box, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

NumberField.propTypes = {}

function NumberField({ name, label, form, placeholder = '' }) {
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
                        type="number"
                    />
                )}
            />
        </Box>
    )
}

export default NumberField
