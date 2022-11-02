import { Box, TextField } from '@mui/material'
import { orange } from '@mui/material/colors'
import { Controller } from 'react-hook-form'

InputField.propTypes = {}

function InputField({ name, label, form, placeholder = '', disabled = false }) {
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
                        disabled={disabled}
                        sx={{
                            '& label.Mui-focused': {
                                color: orange[500],
                            },
                            '& div.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: orange[500],
                            },
                        }}
                    />
                )}
            />
        </Box>
    )
}

export default InputField
