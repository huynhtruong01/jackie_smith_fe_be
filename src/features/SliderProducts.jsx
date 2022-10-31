import { Box, Container, IconButton, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { Autoplay, Navigation } from 'swiper'
// swiper css
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Swiper, SwiperSlide } from 'swiper/react'
import productsApi from '../api/productsApi'
import ButtonOrange from '../components/ButtonOrange'
import { formatPrice } from '../utils/common'

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
            <Container maxWidth="lg">
                <Box mb="40px" display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography
                            variant="h4"
                            component="h3"
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
                                fontSize: '16px',

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
                                        minHeight="150px"
                                    >
                                        <Box
                                            width="150px"
                                            mr="16px"
                                            borderRadius="8px"
                                            overflow="hidden"
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        'https://via.placeholder.com/150x90.png'
                                                }}
                                            />
                                        </Box>
                                        <Box position="relative">
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                fontSize="1rem"
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
                                                >
                                                    {formatPrice(product.salePrice)}
                                                </Typography>
                                                {product.promotionPercent > 0 && (
                                                    <>
                                                        <Typography
                                                            component="span"
                                                            mr="16px"
                                                            fontSize="14px"
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
                                                            fontSize="14px"
                                                        >
                                                            -{product.promotionPercent}%
                                                        </Typography>
                                                    </>
                                                )}
                                            </Box>
                                            <Box position="absolute" bottom="8px">
                                                <Link
                                                    to={
                                                        user ? `/products/${product._id}` : '/login'
                                                    }
                                                >
                                                    <ButtonOrange
                                                        fontSize=".8rem"
                                                        text="Read more"
                                                    />
                                                </Link>
                                            </Box>
                                        </Box>
                                    </Box>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Box>
                )}
            </Container>
        </Box>
    )
}

export default SliderProducts
