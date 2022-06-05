import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, TextField, FormHelperText, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import ButtonOrange from '../../../../components/ButtonOrange'

FilterByPrice.propTypes = {}

function FilterByPrice({ onClick = null }) {
    const [valueLte, setValueLte] = useState(0)
    const [valueGte, setValueGte] = useState(0)
    const [error, setError] = useState('')
    const regex = /^[a-zA-Z]$/

    const handleSelectPrice = () => {
        setError('')

        if (!Number(valueGte) || !Number(valueLte)) {
            setError('Value 1 and value 2 must be number')
            return
        }

        if (Number(valueGte) <= 0 || Number(valueGte) >= Number(valueLte)) {
            setError('Value 1 must be greater than 0 or value 1 is not greater than value 2')
            return
        }

        if (!onClick) return
        onClick(valueGte, valueLte)

        setValueGte(0)
        setValueLte(0)
    }

    return (
        <Box borderTop={`1px solid ${grey[300]}`} p="16px 0">
            <Typography
                variant="h6"
                component="h3"
                fontWeight={500}
                color={orange[500]}
                fontSize="1rem"
                mb="4px"
            >
                Price
            </Typography>
            <Box display="flex" alignItems="center" mb="12px">
                <TextField
                    variant="outlined"
                    onChange={(e) => setValueGte(e.target.value)}
                    value={valueGte}
                    error={!!error}
                    sx={{
                        flex: 3,
                        '.MuiInputBase-root.Mui-focused fieldset': {
                            borderColor: orange[500],
                        },
                    }}
                />
                <Box flex={1} display="flex" justifyContent="center">
                    <Box width="12px" height="2px" backgroundColor={orange[400]}></Box>
                </Box>
                <TextField
                    variant="outlined"
                    onChange={(e) => setValueLte(e.target.value)}
                    value={valueLte}
                    error={!!error}
                    sx={{
                        flex: 3,
                        '.MuiInputBase-root.Mui-focused fieldset': {
                            borderColor: orange[500],
                        },
                    }}
                />
            </Box>
            <Box mb="16px">
                <FormHelperText sx={{ color: '#f00' }}>{error}</FormHelperText>
            </Box>
            <Box onClick={handleSelectPrice}>
                <ButtonOrange text="Select Price" />
            </Box>
        </Box>
    )
}

export default FilterByPrice
