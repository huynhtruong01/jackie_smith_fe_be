import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { orange } from '@mui/material/colors'

ProductFilterArr.propTypes = {}

function ProductFilterArr({ filters, title, data = [], onChange = null }) {
    const handleCheckboxChange = (e) => {
        if (!onChange) return

        console.log(e.target.name)

        if (e.target.name === 'all') {
            onChange('')
            return
        }

        onChange(e.target.name)
    }

    return (
        <Box>
            <Box>
                <Typography
                    variant="h6"
                    component="h3"
                    fontWeight={500}
                    color={orange[500]}
                    fontSize="1rem"
                    mb="4px"
                >
                    {title}
                </Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="all"
                                checked={!filters[title.toLowerCase()]}
                                onChange={handleCheckboxChange}
                                sx={{
                                    color: orange[500],
                                    '&.Mui-checked': {
                                        color: orange[500],
                                    },
                                }}
                            />
                        }
                        label="All"
                    />
                    {data?.map((x) => (
                        <FormControlLabel
                            key={x}
                            control={
                                <Checkbox
                                    name={x.toLowerCase()}
                                    checked={filters[title.toLowerCase()] === x.toLowerCase()}
                                    onChange={handleCheckboxChange}
                                    sx={{
                                        color: orange[500],
                                        '&.Mui-checked': {
                                            color: orange[500],
                                        },
                                    }}
                                />
                            }
                            label={x}
                        />
                    ))}
                </FormGroup>
            </Box>
        </Box>
    )
}

export default ProductFilterArr
