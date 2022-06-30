import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import CategoryItemSkeleton from './CategoryItemSkeleton'

CategoryListSkeleton.propTypes = {}

function CategoryListSkeleton({ limit = 8 }) {
    return (
        <Box>
            {Array.from(new Array(limit)).map((x, index) => (
                <CategoryItemSkeleton key={index} />
            ))}
        </Box>
    )
}

export default CategoryListSkeleton
