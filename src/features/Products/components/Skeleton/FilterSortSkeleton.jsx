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
                    borderRadius: '5px',
                }}
            />
            <Skeleton
                variant="rounded"
                width={180}
                height={48}
                sx={{
                    borderRadius: '5px',
                }}
            />
        </Box>
    )
}

export default FilterSortSkeleton
