import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import PinterestIcon from '@mui/icons-material/Pinterest'
import { Box, Container, IconButton, Typography } from '@mui/material'
import { blue, grey, orange } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'
import LinkList from './components/LinkList'

Footer.propTypes = {}

const socialList = [
    {
        icon: FacebookIcon,
        link: 'https://www.facebook.com/JackieSmithBA/',
    },
    {
        icon: InstagramIcon,
        link: 'https://www.instagram.com/jackiesmithba/',
    },
    {
        icon: PinterestIcon,
        link: 'https://ar.pinterest.com/jackiehandbags/',
    },
]

const ulList = [
    {
        title: 'Shop',
        linkList: ['Benefits Of Buying Online', 'Bags', 'Accessories', 'Clothings', 'Sneakers'],
    },
    {
        title: 'Brand',
        linkList: [
            'History',
            'Purpose And Values',
            'Make It Beautiful',
            'Custom Shop',
            'Monogram It',
            'Join The Team',
        ],
    },
    {
        title: 'Help',
        linkList: [
            'Community Service Help Center',
            'Status Of My Order',
            'Returns & Exchanges',
            'Shipping Times',
            'Pick Up In Store',
            'Our Shops',
        ],
    },
]

function Footer() {
    return (
        <Box component="footer" p="40px 20px" backgroundColor={orange[50]}>
            <Container maxWidth="lg">
                <Box display="flex" columnGap="100px">
                    <Box flex={1}>
                        <Box>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    flex: 1,
                                    color: grey[800],
                                    fontWeight: 'bold',
                                    fontSize: 'x-large',
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        color: orange[700],
                                    }}
                                >
                                    J
                                </Box>
                                ackie{' '}
                                <Box
                                    component="span"
                                    sx={{
                                        color: blue[900],
                                    }}
                                >
                                    S
                                </Box>
                                mith
                            </Typography>
                        </Box>
                        <Typography color={grey[500]} mb="16px" fontSize="13px">
                            Jackie Smith is one of the big stores in Spain.
                        </Typography>
                        <Box>
                            {socialList?.map((social) => {
                                const Icon = social.icon
                                return (
                                    <IconButton
                                        key={social.link}
                                        sx={{
                                            backgroundColor: orange[100],
                                            mr: '10px',
                                            '& svg': {
                                                color: orange[600],
                                            },
                                        }}
                                    >
                                        <Box
                                            component="a"
                                            href={social.link}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            target="_blank"
                                        >
                                            <Icon />
                                        </Box>
                                    </IconButton>
                                )
                            })}
                        </Box>
                    </Box>
                    <Box flex={3} display="flex">
                        {ulList?.map((ul) => (
                            <Box flex={1} key={ul.title}>
                                <LinkList title={ul.title} linkList={ul.linkList} />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer
