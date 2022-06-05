import React from 'react'
import PropTypes from 'prop-types'
import { Box, TextField, IconButton, FormHelperText } from '@mui/material'
import { Controller } from 'react-hook-form'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { orange } from '@mui/material/colors'
import { useDispatch } from 'react-redux'
import { updateQuantity } from '../../features/Cart/cartSlice'
import { CleaningServices } from '@mui/icons-material'

QuantityCartField.propTypes = {}

function QuantityCartField({ name, form }) {
    const { control, setValue, formState } = form
    const error = formState.errors[name]

    return (
        <Box>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Box>
                        <Box display="flex" alignItems="center">
                            <IconButton
                                type="submit"
                                onClick={() => {
                                    setValue(name, value <= 1 ? 1 : Number(value) - 1)
                                }}
                            >
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <TextField
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={!!error}
                                variant="outlined"
                                sx={{
                                    width: '50px',
                                    input: {
                                        p: '12px',
                                        textAlign: 'center',
                                    },
                                    '.MuiOutlinedInput-root.Mui-focused fieldset': {
                                        borderColor: orange[600],
                                    },
                                }}
                            />
                            <IconButton
                                type="submit"
                                onClick={() => {
                                    setValue(name, value >= 10 ? 10 : Number(value) + 1)
                                }}
                            >
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Box>
                        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                    </Box>
                )}
            />
        </Box>
    )
}

export default QuantityCartField
