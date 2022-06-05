import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import ButtonOrange from '../../../components/ButtonOrange'
import { Link, useLocation } from 'react-router-dom'
import { orange, grey } from '@mui/material/colors'
import { formatPrice } from '../../../utils/common'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, showCart } from '../../Cart/cartSlice'
import cartsApi from '../../../api/cartsApi'

ProductItem.propTypes = {}

function ProductItem({ product = {} }) {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user2.currentUser)

    const handleAddToCart = async () => {
        try {
            const cartItem = {
                id: product?._id,
                product,
                quantity: 1,
            }

            // save cart into db
            const cartItemDB = {
                userId: user?.user?._id,
                product: product?._id,
                quantity: 1,
            }
            await cartsApi.add(cartItemDB)

            // save cart into redux
            dispatch(addCart(cartItem))
            dispatch(showCart())
        } catch (error) {
            console.log(error)
        }
    }

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
                <Box onClick={handleAddToCart}>
                    <ButtonOrange text="Add to cart" icon={ShoppingCartIcon} />
                </Box>
            </Box>
        </Box>
    )
}

export default ProductItem
