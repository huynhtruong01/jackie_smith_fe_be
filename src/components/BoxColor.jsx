import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'

BoxColor.propTypes = {}

function BoxColor({ color }) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Box
                sx={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: color,
                    borderRadius: '2px',
                    border: `1px solid ${grey[500]}`,
                }}
            ></Box>
        </Box>
    )
}

export default BoxColor
