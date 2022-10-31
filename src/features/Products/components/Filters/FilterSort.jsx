import { Box, Tab, Tabs } from '@mui/material'
import { orange } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

FilterSort.propTypes = {}

function FilterSort({ filters, onChange = null }) {
    const handleChange = (e, newValue) => {
        if (!onChange) return
        onChange(newValue)
    }

    return (
        <Box>
            <Tabs
                value={filters.sort}
                onChange={handleChange}
                sx={{
                    '.MuiTabs-indicator': {
                        backgroundColor: orange[500],
                    },
                }}
            >
                <Tab
                    value="salePrice"
                    label="Price low to high"
                    sx={{
                        '&.Mui-selected': {
                            color: orange[500],
                        },
                    }}
                />
                <Tab
                    value="-salePrice"
                    label="Price high to low"
                    sx={{
                        '&.Mui-selected': {
                            color: orange[500],
                        },
                    }}
                />
            </Tabs>
        </Box>
    )
}

export default FilterSort
