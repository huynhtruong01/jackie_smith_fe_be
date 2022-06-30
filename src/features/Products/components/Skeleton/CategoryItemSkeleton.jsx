import React from 'react'
import PropTypes from 'prop-types'
import { Box, Skeleton } from '@mui/material'

CategoryItemSkeleton.propTypes = {}

function CategoryItemSkeleton() {
    return (
        <Box display="flex" height="42px">
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
