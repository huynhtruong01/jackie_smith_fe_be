import { Box, Skeleton } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

CategoryItemSkeleton.propTypes = {}

function CategoryItemSkeleton() {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '42px',
                borderRadius: '5px',
            }}
        >
            <Skeleton
                variant="rectangular"
                width={20}
                height={20}
                sx={{
                    mr: '8px',
                    borderRadius: '3px',
                }}
            />
            <Skeleton
                variant="rectangular"
                width="80%"
                height={20}
                sx={{
                    borderRadius: '3px',
                }}
            />
        </Box>
    )
}

export default CategoryItemSkeleton
