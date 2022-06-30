import React from 'react'
import PropTypes from 'prop-types'
import { Box, Skeleton, Typography } from '@mui/material'

ProductItemSkeleton.propTypes = {}

function ProductItemSkeleton(props) {
    return (
        <Box>
            <Box>
                <Skeleton
                    variant="rectangular"
                    width={278}
                    height={370}
                    sx={{
                        borderRadius: '5px',
                    }}
                />
            </Box>
            <Box
                sx={{
                    p: '22px 8px 12px',
                }}
            >
                <Skeleton variant="text" width="70%" />
                <Skeleton
                    variant="text"
                    width="100%"
                    sx={{
                        mb: '16px',
                    }}
                />
                <Skeleton variant="rectangular" width="129px" height="41px" />
            </Box>
        </Box>
    )
}

export default ProductItemSkeleton
