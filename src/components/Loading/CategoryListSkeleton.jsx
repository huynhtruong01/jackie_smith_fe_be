import { Box, Skeleton } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

CategoryListSkeleton.propTypes = {}

function CategoryListSkeleton({ quantity = 4 }) {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '10px',
            }}
        >
            <Skeleton
                variant="rounded"
                width={`calc(100%/${quantity} - 10px)`}
                height={450}
                sx={{
                    borderRadius: '5px',
                }}
            />
            <Skeleton
                variant="rounded"
                width={`calc(100%/${quantity} - 10px)`}
                height={450}
                sx={{
                    borderRadius: '5px',
                }}
            />
            <Skeleton
                variant="rounded"
                width={`calc(100%/${quantity} - 10px)`}
                height={450}
                sx={{
                    borderRadius: '5px',
                }}
            />
            <Skeleton
                variant="rounded"
                width={`calc(100%/${quantity} - 10px)`}
                height={450}
                sx={{
                    borderRadius: '5px',
                }}
            />
        </Box>
    )
}

export default CategoryListSkeleton
