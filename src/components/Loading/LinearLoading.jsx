import { Box, LinearProgress } from '@mui/material'
import { orange } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'

LinearLoading.propTypes = {}

function LinearLoading({ top = 0 }) {
    return (
        <Box sx={{ width: '100%', position: 'absolute', top }}>
            <LinearProgress
                sx={{
                    backgroundColor: orange[100],
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: orange[500],
                    },
                }}
            />
        </Box>
    )
}

export default LinearLoading
