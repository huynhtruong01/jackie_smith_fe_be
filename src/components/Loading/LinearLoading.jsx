import { Box, LinearProgress } from '@mui/material'
import { orange } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'

LinearLoading.propTypes = {}

function LinearLoading(props) {
    return (
        <Box sx={{ width: '100%', position: 'absolute', top: 0 }}>
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
