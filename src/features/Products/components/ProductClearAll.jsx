import { Box, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
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
                    fontWeight: 600,
                    padding: '8px',
                    backgroundColor: orange[50],
                    borderRadius: '5px',
                    transition: '.2s ease-in-out',

                    '&:hover': {
                        color: '#fff',
                        backgroundColor: orange[500],
                    },
                }}
                onClick={handleChange}
            >
                Clear filter
            </Typography>
        </Box>
    )
}

export default ProductClearAll
