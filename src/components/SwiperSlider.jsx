import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box, IconButton } from '@mui/material'
import { orange } from '@mui/material/colors'
import React from 'react'
import { Navigation, Pagination, Autoplay } from 'swiper'
// swiper css
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Swiper, SwiperSlide } from 'swiper/react'

SwiperSlider.propTypes = {}

function SwiperSlider({ data, number = 1 }) {
    return (
        <Box
            sx={{
                p: '10px 0',
                '& .swiper': {
                    width: '100%',
                    minHeight: 'calc(100vh - 100px)',
                    overflow: 'hidden',
                    borderRadius: '8px',
                },

                '& .swiper-slide': {
                    borderRadius: '8px',
                    overflow: 'hidden',
                    height: '650px',

                    '& img': {},
                },

                '& .swiper-pagination': {
                    bottom: '30px',
                },

                '& .btn': {
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                },
                '& .btn-swiper-prev': {
                    left: '30px',
                },
                '& .btn-swiper-next': {
                    right: '30px',
                },
                '& .swiper-pagination-bullet': {
                    backgroundColor: '#fff',
                },
                '& .swiper-pagination-bullet-active': {
                    backgroundColor: orange[600],
                },

                '& svg': {
                    color: '#fff',
                    width: '2rem',
                    height: '2rem',
                },
            }}
        >
            <IconButton className="btn btn-swiper-prev">
                <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton className="btn btn-swiper-next">
                <ArrowForwardIosIcon />
            </IconButton>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{
                    delay: 1500,
                }}
                loop={true}
                spaceBetween={50}
                slidesPerView={number}
                navigation={{
                    prevEl: '.btn-swiper-prev',
                    nextEl: '.btn-swiper-next',
                }}
                pagination={{ clickable: true }}
            >
                {data?.map((x) => (
                    <SwiperSlide key={x}>
                        <img src={x} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}

export default SwiperSlider
