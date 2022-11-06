import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, FormHelperText, IconButton, TextField } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import React from 'react'
import { Controller } from 'react-hook-form'

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
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                border: `1px solid ${grey[300]}`,
                                overflow: 'hidden',
                                borderRadius: '3px',
                                height: '30px',
                            }}
                        >
                            <IconButton
                                type="submit"
                                onClick={() => setValue(name, value <= 1 ? 1 : Number(value) - 1)}
                                sx={{
                                    display: 'inline-flex',
                                    borderRadius: 0,
                                    borderRight: `1px solid ${grey[300]}`,
                                    width: '30px',
                                    svg: {
                                        fontSize: '18px',
                                    },
                                }}
                            >
                                <RemoveIcon />
                            </IconButton>
                            <TextField
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={!!error}
                                variant="outlined"
                                sx={{
                                    width: '30px',
                                    input: {
                                        p: '4px',
                                        textAlign: 'center',
                                        fontSize: '14px',
                                    },
                                    fieldset: {
                                        border: 'none',
                                    },
                                    '.MuiOutlinedInput-root.Mui-focused fieldset': {
                                        borderColor: orange[600],
                                    },
                                }}
                            />
                            <IconButton
                                type="submit"
                                onClick={() => setValue(name, value >= 10 ? 10 : Number(value) + 1)}
                                sx={{
                                    display: 'inline-flex',
                                    borderRadius: 0,
                                    borderLeft: `1px solid ${grey[300]}`,
                                    width: '30px',
                                    svg: {
                                        fontSize: '18px',
                                    },
                                }}
                            >
                                <AddIcon />
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
