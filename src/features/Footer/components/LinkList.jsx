import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'

LinkList.propTypes = {}

function LinkList({ title, linkList }) {
    return (
        <Box>
            <Typography variant="h6" component="h3" fontWeight={600} color={orange[500]} mb="8px">
                {title}
            </Typography>
            <Box component="ul">
                {linkList?.map((link) => (
                    <Box component="li" mb="8px" key={link}>
                        <Box
                            component="a"
                            href="#"
                            target="_blank"
                            sx={{
                                display: 'inline-block',
                                color: grey[600],
                                p: '4px 0',
                                fontFamily: "'Poppins', 'sans-serif'",
                                fontSize: '0.9rem',
                                transition: '.2s ease-in-out',
                                '&:hover': {
                                    color: grey[900],
                                    transform: 'translateX(3px)',
                                },
                            }}
                        >
                            {link}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default LinkList
