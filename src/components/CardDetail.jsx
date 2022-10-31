import { Box, Container, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React from 'react'
import ButtonOrange from './ButtonOrange'

CardDetail.propTypes = {}

function CardDetail({ item }) {
    return (
        <Box p="30px 0 70px" backgroundColor="#fff">
            <Container maxWidth="lg">
                <Box mb="40px">
                    <Typography
                        variant="h4"
                        component="h3"
                        textAlign="center"
                        fontWeight={600}
                        color={orange[600]}
                        textTransform="uppercase"
                    >
                        Best selling
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Box width="500px" borderRadius="8px" overflow="hidden" mr="50px">
                        <img src={item.img} alt={item.title} />
                    </Box>
                    <Box>
                        <Typography variant="h2" component="h2" mb="4px">
                            {item.title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            mb="12px"
                            fontSize="1.1rem"
                            color={grey[500]}
                        >
                            {item.desc}
                        </Typography>
                        <ButtonOrange text="Read more" />
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default CardDetail
