import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import ProductItemSkeleton from './ProductItemSkeleton'

ProductListSkeleton.propTypes = {}

function ProductListSkeleton({ limit = 12 }) {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '10px',
                flexFlow: 'row wrap',
            }}
        >
            {Array.from(new Array(limit)).map((x, index) => (
                <ProductItemSkeleton key={index} />
            ))}
        </Box>
    )
}

export default ProductListSkeleton
