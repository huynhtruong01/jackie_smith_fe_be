import { Box } from '@mui/material'

ButtonClick.propTypes = {}

function ButtonClick({ bgColor, textColor, text = '' }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: bgColor,
                borderRadius: '3px',
                p: '5px',
                color: textColor,
            }}
        >
            {text}
        </Box>
    )
}

export default ButtonClick
