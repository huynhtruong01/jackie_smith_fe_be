import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { green } from '@mui/material/colors'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Link, useLocation } from 'react-router-dom'

OptionDetail.propTypes = {}

function OptionDetail({ data }) {
    const { pathname } = useLocation()

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: green[50],
                    borderRadius: '3px',
                    p: '5px',
                    cursor: 'pointer',
                    mr: '5px',

                    '& > svg': {
                        color: green[500],
                    },

                    '&:hover': {
                        backgroundColor: green[100],
                    },
                }}
            >
                <Link to={`${pathname}/${data.id}`}>
                    <MoreHorizIcon />
                </Link>
            </Box>
        </Box>
    )
}

export default OptionDetail
