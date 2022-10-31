import { Box, Skeleton } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

FilterByPriceSkeleton.propTypes = {}

function FilterByPriceSkeleton() {
    return (
        <Box>
            <Box mb="12px">
                <Skeleton width="100px" variant="text" />
            </Box>
            <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb="12px">
                    <Skeleton variant="rounded" width="111px" height="56px" />
                    <Skeleton variant="rounded" width="12px" height="2px" />
                    <Skeleton variant="rounded" width="111px" height="56px" />
                </Box>
                <Skeleton variant="rounded" width="125px" height="37px" />
            </Box>
        </Box>
    )
}

export default FilterByPriceSkeleton
