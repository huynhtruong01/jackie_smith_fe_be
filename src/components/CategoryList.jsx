import { Box, Button, Grid, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ButtonOrange from './ButtonOrange'

CategoryList.propTypes = {}

function CategoryList({ categoryList }) {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user2.currentUser)

    const handleClick = (id) => {
        if (user) {
            navigate(`/products?category=${id}`)
            return
        }

        navigate('/login')
    }

    return (
        <Box p="30px 0 70px">
            <Typography
                variant="h4"
                component="h2"
                textAlign="center"
                textTransform="uppercase"
                fontWeight={600}
                color={orange[600]}
                mb="22px"
            >
                Category
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                }}
            >
                {categoryList?.map((category) => (
                    <Box
                        key={category.name}
                        sx={{
                            position: 'relative',
                            width: 'calc(100%/4 - 10px)',
                            height: '450px',
                            mr: '10px',
                            borderRadius: '8px',
                            overflow: 'hidden',

                            '& > .overlay': {
                                opacity: 0,
                                visibility: 'hidden',
                                transition: '.2s ease-in-out',
                            },

                            '& > .btn': {
                                opacity: 0,
                                visibility: 'hidden',
                                transition: '.2s ease-in-out',
                            },

                            '&:hover > .overlay': {
                                opacity: 1,
                                visibility: 'visible',
                            },

                            '&:hover > .btn': {
                                opacity: 1,
                                visibility: 'visible',
                            },
                        }}
                    >
                        <Box
                            className="overlay"
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                zIndex: 1,
                            }}
                        ></Box>
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <img src={category?.image} alt="" />
                        </Box>
                        <Box
                            className="btn"
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 2,
                            }}
                            onClick={() => handleClick(category.id)}
                        >
                            <ButtonOrange text={category?.name} />
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default CategoryList
