import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import { orange } from '@mui/material/colors'

ButtonOrange.propTypes = {}

function ButtonOrange({ text, icon, fullWidth, type = '', disabled = false, fontSize = '.9rem' }) {
    const Icon = icon

    return (
        <Button
            type={type}
            variant="contained"
            sx={{
                backgroundColor: orange[300],
                fontSize: fontSize,
                '&:hover': {
                    backgroundColor: orange[600],
                },
            }}
            startIcon={Icon ? <Icon /> : ''}
            fullWidth={fullWidth}
            disabled={disabled}
        >
            {text}
        </Button>
    )
}

export default ButtonOrange
