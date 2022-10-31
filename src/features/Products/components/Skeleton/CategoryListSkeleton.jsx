import { Box, Skeleton } from '@mui/material'
import React from 'react'
import CategoryItemSkeleton from './CategoryItemSkeleton'

CategoryListSkeleton.propTypes = {}

function CategoryListSkeleton({ limit = 8 }) {
    return (
        <Box>
            <Box mb="12px">
                <Skeleton width="100px" variant="text" />
            </Box>
            {Array.from(new Array(limit)).map((x, index) => (
                <CategoryItemSkeleton key={index} />
            ))}
        </Box>
    )
}

export default CategoryListSkeleton
