import { Box, Skeleton } from '@mui/material'
import { grey } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'

DetailPageSkeleton.propTypes = {}

function DetailPageSkeleton() {
    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: '22px',
                }}
            >
                <Box
                    sx={{
                        border: `1px solid ${grey[300]}`,
                        borderRadius: '5px',
                        overflow: 'hidden',
                        flex: 1,
                        height: '400px',
                    }}
                >
                    <Skeleton variant="rounded" width={`100%`} height={`100%`} />
                </Box>
                <Box p="16px 26px" backgroundColor="#fff" borderRadius="5px" flex={3}>
                    <Box mb="4px">
                        <Skeleton variant="text" width="40%" sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Box mb="16px">
                        <Skeleton variant="text" width="70%" sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="text" width="40%" sx={{ fontSize: '1rem' }} />
                    </Box>
                    <Box m="3px 0 4px">
                        <Skeleton variant="text" width="30%" sx={{ fontSize: '.8rem' }} />
                        <Skeleton variant="text" width="50%" sx={{ fontSize: '.8rem' }} />
                        <Skeleton variant="text" width="40%" sx={{ fontSize: '.8rem' }} />
                    </Box>
                    <Box m="3px 0 4px">
                        <Skeleton variant="text" width="30%" sx={{ fontSize: '.8rem' }} />
                        <Skeleton variant="text" width="50%" sx={{ fontSize: '.8rem' }} />
                        <Skeleton variant="text" width="40%" sx={{ fontSize: '.8rem' }} />
                    </Box>
                    <Box m="3px 0 4px">
                        <Skeleton variant="text" width="30%" sx={{ fontSize: '.8rem' }} />
                        <Skeleton variant="text" width="50%" sx={{ fontSize: '.8rem' }} />
                        <Skeleton variant="text" width="40%" sx={{ fontSize: '.8rem' }} />
                    </Box>
                    <Box m="3px 0 4px">
                        <Skeleton variant="text" width="30%" sx={{ fontSize: '.8rem' }} />
                        <Skeleton variant="text" width="50%" sx={{ fontSize: '.8rem' }} />
                        <Skeleton variant="text" width="40%" sx={{ fontSize: '.8rem' }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default DetailPageSkeleton
