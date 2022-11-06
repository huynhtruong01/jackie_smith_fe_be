import { Button } from '@mui/material'
import { orange } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'

ButtonOrange.propTypes = {}

function ButtonOrange({
    text,
    icon,
    fullWidth,
    type = '',
    disabled = false,
    fontSize = '.9rem',
    onClick = null,
}) {
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
            onClick={onClick}
        >
            {text}
        </Button>
    )
}

export default ButtonOrange
