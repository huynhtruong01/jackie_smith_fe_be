import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { Link } from 'react-router-dom'

NotFound.propTypes = {}

function NotFound() {
    return (
        <Box
            display="flex"
            mt="64px"
            width="100%"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Box width="300px" mb="16px">
                <img
                    src="https://media4.giphy.com/media/2X4e4KrOMz7gaXU1Z4/giphy.gif?cid=ecf05e47rzlishfclrur93u03i4b074hiraggz00l2g8cmk1&rid=giphy.gif&ct=g"
                    alt=""
                />
            </Box>
            <Typography color={grey[700]} mb="8px">
                The page is missing or you assembled the link incorrectly
            </Typography>
            <Box
                display="flex"
                alignItems="center"
                sx={{
                    svg: {
                        color: orange[500],
                        mr: '12px',
                        transition: '.2s ease-in-out',
                    },

                    a: {
                        color: orange[500],
                        fontWeight: 500,
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    },

                    '&:hover': {
                        svg: {
                            transform: 'translateX(-4px)',
                        },
                    },
                }}
            >
                <ArrowBackIcon />
                <Link to="/">Back to Home Page</Link>
            </Box>
        </Box>
    )
}

export default NotFound
