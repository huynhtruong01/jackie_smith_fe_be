import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import ButtonOrange from '../../../components/ButtonOrange'
import { formatPrice } from '../../../utils/common'

ProductItem.propTypes = {}

function ProductItem({ product = {} }) {
    const { pathname } = useLocation()
    const user = useSelector((state) => state.user2.currentUser)

    return (
        <Box border={`1px solid ${grey[200]}`} borderRadius="5px" overflow="hidden">
            <Box
                overflow="hidden"
                sx={{
                    '& img': {
                        transition: '.3s ease-in-out',
                    },

                    '&:hover img': {
                        transform: 'scale(1.1)',
                    },
                    minHeight: '420px',
                }}
            >
                <Link to={`${pathname}/${product._id}`}>
                    <img src={product?.image} alt={product?.name} />
                </Link>
            </Box>
            <Box
                p="22px 8px 12px"
                backgroundColor={grey[50]}
                borderRadius="5px 5px 0 0"
                borderTop={`1px solid ${grey[200]}`}
                sx={{
                    '& button': {
                        p: '8px 12px',
                    },
                }}
            >
                <Link to={`${pathname}/${product._id}`}>
                    <Typography
                        component="h2"
                        variant="h5"
                        fontWeight={600}
                        color={orange[400]}
                        mb="4px"
                        sx={{
                            transition: '.2s ease-in-out',
                            '&:hover': {
                                color: orange[700],
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        {product?.name}
                    </Typography>
                </Link>
                <Box mb="16px">
                    <Typography component="span" mr="16px" fontSize="1.3rem" fontWeight={600}>
                        {formatPrice(product?.salePrice)}
                    </Typography>
                    {product?.promotionPercent > 0 && (
                        <>
                            <Typography
                                component="span"
                                mr="16px"
                                fontSize="1rem"
                                color={grey[500]}
                                sx={{
                                    textDecoration: 'line-through',
                                }}
                            >
                                {formatPrice(product?.originalPrice)}
                            </Typography>
                            <Typography
                                component="span"
                                p="4px 8px"
                                borderRadius="3px"
                                backgroundColor={orange[600]}
                                color="#fff"
                            >
                                -{product?.promotionPercent}%
                            </Typography>
                        </>
                    )}
                </Box>
                <Box>
                    <Link to={`${pathname}/${product?._id}`}>
                        <ButtonOrange text="Read more" icon={ShoppingCartIcon} />
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default ProductItem
