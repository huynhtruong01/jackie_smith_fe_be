import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import { Box } from '@mui/material'
import { orange } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'

ScrollTop.propTypes = {}

function ScrollTop() {
    const [active, setActive] = useState(false)

    const handleScroll = () => {
        if (window.scrollY > 200) {
            setActive(true)
        } else {
            setActive(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleScrollTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <Box
            className={active ? 'active' : ''}
            onClick={handleScrollTop}
            sx={{
                position: 'fixed',
                bottom: '25px',
                right: '-100%',
                opacity: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: orange[500],
                borderRadius: '50%',
                fontSize: '20px',
                width: '50px',
                height: '50px',
                cursor: 'pointer',
                boxShadow: '0 10px 10px #00000033',
                zIndex: 10,
                transition: '.4s ease-in-out',

                '&.active': {
                    right: '20px',
                    opacity: 1,
                },

                '&:hover': {
                    backgroundColor: orange[700],
                },
            }}
        >
            <ExpandLessRoundedIcon
                sx={{
                    color: '#fff',
                }}
            />
        </Box>
    )
}

export default ScrollTop
