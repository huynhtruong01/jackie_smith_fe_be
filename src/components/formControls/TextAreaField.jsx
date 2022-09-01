import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

TextAreaField.propTypes = {}

function TextAreaField({ name, label, form, placeholder = '', disabled = false }) {
    const { control, formState } = form
    const error = formState.errors[name]

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onBlur, onChange, value } }) => (
                <TextField
                    name={name}
                    maxRows={5}
                    multiline
                    margin="normal"
                    fullWidth
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    label={label}
                    placeholder={placeholder}
                    error={!!error}
                    helperText={error?.message}
                    disabled={disabled}
                />
            )}
        />
    )
}

export default TextAreaField
