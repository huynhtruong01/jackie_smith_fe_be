import { Box, IconButton, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { Autoplay, Navigation } from 'swiper'
// swiper css
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Swiper, SwiperSlide } from 'swiper/react'
import productsApi from '../api/productsApi'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { formatPrice } from '../utils/common'
import ButtonOrange from '../components/ButtonOrange'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

SliderProducts.propTypes = {}

function SliderProducts() {
    const [productList, setProductList] = useState([])
    const user = useSelector((state) => state.user2.currentUser)

    useEffect(() => {
        const getProducts = async () => {
            try {
                const { products } = await productsApi.getAll({ limit: 8 })
                setProductList(products)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getProducts()
    }, [])

    return (
        <Box p="30px 0 70px">
            <Box mb="40px" display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography
                        variant="h3"
                        component="h2"
                        fontWeight={600}
                        color={orange[600]}
                        mb="4px"
                    >
                        The product
                    </Typography>
                    <Typography color={grey[500]} mb="8px">
                        These are the products most customers buy in 2022
                    </Typography>
                    <Box
                        sx={{
                            '& .btn': {
                                backgroundColor: grey[100],
                            },

                            '& svg': {
                                width: '24px',
                                height: '24px',
                            },
                        }}
                    >
                        <IconButton
                            className="btn btn-prev"
                            sx={{
                                mr: '8px',
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <IconButton className="btn btn-next">
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box
                    sx={{
                        a: {
                            color: orange[400],

                            '&:hover': {
                                color: orange[600],
                                textDecoration: 'underline',
                            },
                        },
                    }}
                >
                    <Link to="/products">Show more</Link>
                </Box>
            </Box>
            {productList?.length > 0 && (
                <Box>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        autoplay={{
                            delay: 1500,
                        }}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={3}
                        navigation={{
                            prevEl: '.btn-prev',
                            nextEl: '.btn-next',
                        }}
                    >
                        {productList?.map((product) => (
                            <SwiperSlide key={product._id}>
                                <Box
                                    display="flex"
                                    p="12px"
                                    backgroundColor={grey[100]}
                                    borderRadius="8px"
                                >
                                    <Box
                                        width="150px"
                                        mr="16px"
                                        borderRadius="8px"
                                        overflow="hidden"
                                    >
                                        <img src={product.image} alt={product.name} />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            fontSize="1.4rem"
                                            fontWeight={700}
                                            color={orange[300]}
                                        >
                                            {product.name}
                                        </Typography>
                                        <Box mb="16px">
                                            <Typography
                                                component="span"
                                                fontWeight={600}
                                                mr="10px"
                                                fontSize="1.2rem"
                                            >
                                                {formatPrice(product.salePrice)}
                                            </Typography>
                                            {product.promotionPercent > 0 && (
                                                <>
                                                    <Typography
                                                        component="span"
                                                        mr="16px"
                                                        sx={{
                                                            textDecoration: 'line-through',
                                                            color: grey[600],
                                                        }}
                                                    >
                                                        {formatPrice(product.originalPrice)}
                                                    </Typography>
                                                    <Typography
                                                        component="span"
                                                        color={orange[600]}
                                                        fontWeight={600}
                                                    >
                                                        -{product.promotionPercent}%
                                                    </Typography>
                                                </>
                                            )}
                                        </Box>
                                        <Link to={user ? `/products/${product._id}` : '/login'}>
                                            <ButtonOrange text="Read more" />
                                        </Link>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            )}
        </Box>
    )
}

export default SliderProducts
