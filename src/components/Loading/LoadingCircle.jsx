import { Box, CircularProgress } from '@mui/material'
import { orange } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'

LoadingCircle.propTypes = {}

function LoadingCircle(props) {
    return (
        <Box display="flex" justifyContent="center">
            <CircularProgress
                sx={{
                    svg: {
                        color: orange[500],
                    },
                }}
            />
        </Box>
    )
}

export default LoadingCircle
