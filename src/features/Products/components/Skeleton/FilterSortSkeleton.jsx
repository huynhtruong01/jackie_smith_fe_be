import { Box, Skeleton } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

FilterSortSkeleton.propTypes = {}

function FilterSortSkeleton() {
    return (
        <Box display="flex">
            <Skeleton
                variant="rounded"
                width={180}
                height={48}
                sx={{
                    mr: '8px',
                }}
            />
            <Skeleton variant="rounded" width={180} height={48} />
        </Box>
    )
}

export default FilterSortSkeleton
