import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import ProductItem from './ProductItem'

ProductList.propTypes = {}

function ProductList({ productList = [] }) {
    return (
        <Box>
            <Box
                display="flex"
                width="100%"
                gap="10px"
                sx={{
                    flexFlow: 'row wrap',
                }}
            >
                {productList?.map((product) => (
                    <Box key={product._id} width="calc(100%/4 - 10px)">
                        <ProductItem product={product} />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default ProductList
