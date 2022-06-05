import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Tabs, Tab } from '@mui/material'
import { orange } from '@mui/material/colors'

FilterSort.propTypes = {}

function FilterSort({ filters, onChange = null }) {
    const handleChange = (e, newValue) => {
        if (!onChange) return
        onChange(newValue)
    }

    return (
        <Box mb="22px">
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
