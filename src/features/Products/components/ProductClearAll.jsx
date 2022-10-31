import { Box, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'

ProductClearAll.propTypes = {}

function ProductClearAll({ filters = {}, onChange = null }) {
    const handleChange = () => {
        if (!onChange) return

        const newFilters = { ...filters, page: 1, limit: 12, sort: 'salePrice' }
        delete newFilters.category
        delete newFilters.style
        delete newFilters.color
        delete newFilters['salePrice[gte]']
        delete newFilters['salePrice[lte]']
        delete newFilters['search']

        onChange(newFilters)
    }

    return (
        <Box>
            <Typography
                variant="h6"
                fontSize="1rem"
                color={orange[500]}
                fontWeight={500}
                sx={{
                    display: 'inline-block',
                    cursor: 'pointer',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                }}
                onClick={handleChange}
            >
                Clear all
            </Typography>
        </Box>
    )
}

export default ProductClearAll
