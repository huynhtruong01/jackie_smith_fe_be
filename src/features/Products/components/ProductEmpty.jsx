import { Box, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'

ProductEmpty.propTypes = {}

function ProductEmpty(props) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Box width="500px">
                <img
                    src="https://cdn.dribbble.com/users/1753953/screenshots/3818675/animasi-emptystate.gif"
                    alt=""
                />
            </Box>
            <Typography color={orange[600]}>
                Not have product to you filter. Please you filter again
            </Typography>
        </Box>
    )
}

export default ProductEmpty
