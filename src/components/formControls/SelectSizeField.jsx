import React from 'react'
import PropTypes from 'prop-types'
import { Box, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import { Controller } from 'react-hook-form'
import { formatCapitalize } from '../../utils/common'
import { orange } from '@mui/material/colors'

SelectSizeField.propTypes = {}

function SelectSizeField({ name, form, label, menuList }) {
    const { control, formState } = form
    const error = formState.errors[name]

    return (
        <Box width="100%">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <FormControl fullWidth error={!!error}>
                        <InputLabel
                            id="demo-simple-select-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: orange[500],
                                },
                            }}
                        >
                            {label}
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            label={label}
                            onChange={onChange}
                            sx={{
                                '&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
                                    borderColor: orange[500],
                                },
                            }}
                        >
                            {menuList?.map((menu) => (
                                <MenuItem value={menu} key={menu}>
                                    {menu.toUpperCase()}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{error?.message}</FormHelperText>
                    </FormControl>
                )}
            />
        </Box>
    )
}

export default SelectSizeField
