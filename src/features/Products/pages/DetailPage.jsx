import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productsApi from '../../../api/productsApi'
import { orange, grey } from '@mui/material/colors'
import { formatCapitalize, formatPrice } from '../../../utils/common'
import QuantityForm from '../components/QuantityForm'
import { useDispatch, useSelector } from 'react-redux'
import { setCartList, showCart } from '../../Cart/cartSlice'
import cartsApi from '../../../api/cartsApi'
import { clothingSizeList, sneakerSizeList } from '../../../utils/size'

DetailPage.propTypes = {}

const nameCategoriesList = ['clothings', 'sneakers']

function DetailPage() {
    const [product, setProduct] = useState({})
    const params = useParams()
    const dispatch = useDispatch()
    const cartList = useSelector((state) => state.cart.cartList)
    const user = useSelector((state) => state.user2.currentUser)

    console.log(cartList)

    useEffect(() => {
        const getProduct = async () => {
            try {
                const product = await productsApi.getById(params?.id)
                setProduct(product)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getProduct()
    }, [params?.id])

    const handleQuantitySubmit = async ({ quantity, size }) => {
        try {
            const cartItem = {
                id: product._id,
                product,
                quantity,
                size,
            }

            // add cart in db
            await cartsApi.add({
                userId: user.user._id,
                product: product?._id,
                quantity,
                size,
            })

            console.log(cartItem)

            const carts = await cartsApi.getById(user?.user?._id)

            // dispatch cartList
            dispatch(setCartList(carts.items))

            // add cart in redux
            dispatch(showCart())
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    }

    console.log(product)

    return (
        <Box>
            <Box display="flex" columnGap="22px">
                <Box
                    border={`1px solid ${grey[300]}`}
                    borderRadius="5px"
                    overflow="hidden"
                    flex={1}
                >
                    <img src={product?.image} alt={product?.name} />
                </Box>
                <Box p="16px 26px" backgroundColor="#fff" borderRadius="5px" flex={3}>
                    <Typography
                        color={orange[500]}
                        variant="h4"
                        component="h2"
                        fontWeight={500}
                        mb="4px"
                    >
                        {product?.name}
                    </Typography>
                    <Typography color={grey[500]} fontSize="0.9rem">
                        {product?.description}
                    </Typography>
                    <Box m="8px 0 16px" display="flex" alignItems="center">
                        <Typography component="span" fontSize="1.8rem" fontWeight={600} mr="16px">
                            {!!product?.salePrice && formatPrice(product?.salePrice)}
                        </Typography>
                        {product?.promotionPercent > 0 && (
                            <>
                                <Typography
                                    component="span"
                                    color={grey[500]}
                                    mr="16px"
                                    sx={{
                                        textDecoration: 'line-through',
                                    }}
                                >
                                    {!!product?.originalPrice &&
                                        formatPrice(product?.originalPrice)}
                                </Typography>
                                <Typography
                                    component="span"
                                    color="#fff"
                                    backgroundColor={orange[500]}
                                    p="4px 8px"
                                    borderRadius="3px"
                                >
                                    -{product?.promotionPercent}%
                                </Typography>
                            </>
                        )}
                    </Box>
                    <Box mb="26px">
                        <Typography
                            component="span"
                            mr="8px"
                            sx={{
                                color: '#fff',
                                backgroundColor: orange[500],
                                p: '4px 8px',
                                borderRadius: '3px',
                            }}
                        >
                            {!!product?.category?.name && formatCapitalize(product?.category?.name)}
                        </Typography>
                        <Typography
                            component="span"
                            sx={{
                                color: '#fff',
                                backgroundColor: orange[500],
                                p: '4px 8px',
                                borderRadius: '3px',
                            }}
                        >
                            {!!product?.color && formatCapitalize(product?.color?.name)}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" mb="4px" fontWeight={600}>
                            Quantity
                        </Typography>
                        {product?.category?.name === 'clothings' && (
                            <QuantityForm
                                onSubmit={handleQuantitySubmit}
                                menuList={clothingSizeList}
                            />
                        )}
                        {product?.category?.name === 'sneakers' && (
                            <QuantityForm
                                onSubmit={handleQuantitySubmit}
                                menuList={sneakerSizeList}
                            />
                        )}
                        {!nameCategoriesList.includes(product?.category?.name) && (
                            <QuantityForm onSubmit={handleQuantitySubmit} />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default DetailPage
