import { Box, Button, Modal, Typography } from '@mui/material'
import { grey, orange, red } from '@mui/material/colors'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getIdCartFromDB, removeAllCart, removeCart } from './cartSlice'
import CartList from './components/CartList'
import CartTotal from './components/CartTotal'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import cartsApi from '../../api/cartsApi'
import ButtonOrange from '../../components/ButtonOrange'
import CartEmpty from '../../assets/images/cart-empty.gif'

Cart.propTypes = {}

function Cart() {
    const [open, setOpen] = useState(false)
    const [openRemoveAll, setOpenRemoveAll] = useState(false)
    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const cartList = useSelector((state) => state.cart.cartList)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user2.currentUser)
    const idCart = useSelector((state) => state.user2.id)

    useEffect(() => {
        const getCartId = async () => {
            try {
                if (!idCart) {
                    const cart = await cartsApi.getByUserId(user?.user?._id)
                    dispatch(getIdCartFromDB(cart._id))
                }
            } catch (error) {
                console.log(error)
            }
        }

        getCartId()
    }, [])

    const handleOpenModal = ({ isOpen, id, name }) => {
        setOpen(isOpen)
        setId(id)
        setName(name)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseRemoveAll = () => {
        setOpenRemoveAll(false)
    }

    const handleRemoveCart = async () => {
        try {
            // remove and update into db
            const cartItemDB = {
                userId: user?.user._id,
                product: id,
            }
            await cartsApi.updateCart(cartItemDB)

            // remove into redux
            dispatch(removeCart(id))
            setOpen(false)
            setId(null)
            setName('')
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    // clear all
    const handleRemoveAllCart = async () => {
        try {
            // remove all into db
            await cartsApi.removeAllCart({ userId: user?.user?._id })

            // remove all into redux
            dispatch(removeAllCart())

            setOpenRemoveAll(false)
        } catch (error) {
            console.log('Error: ', error.response.data.message)
        }
    }

    console.log(cartList)

    return (
        <Box p="16px 16px 32px">
            {user && (
                <>
                    {cartList?.length > 0 && (
                        <Box mb="22px" display="flex" justifyContent="space-between">
                            <Box
                                sx={{
                                    display: 'flex',
                                    a: {
                                        display: 'inline',
                                        mr: '4px',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            color: orange[500],
                                            mr: '8px',
                                            '& + svg': {
                                                color: orange[700],
                                            },
                                        },
                                    },
                                }}
                            >
                                <Link to="/products">Continue shopping</Link>
                                <ArrowForwardIcon />
                            </Box>
                            <Box onClick={() => setOpenRemoveAll(true)}>
                                <ButtonOrange text="delete all" />
                            </Box>
                        </Box>
                    )}
                    <Box display="flex" gap="16px">
                        {cartList?.length === 0 && (
                            <>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    flexDirection="column"
                                    width="100%"
                                >
                                    <Box width="400px" mb="16px">
                                        <img src={CartEmpty} alt="" />
                                    </Box>
                                    <Typography>
                                        Your cart is empty{' '}
                                        <Typography
                                            component="span"
                                            color={orange[600]}
                                            sx={{
                                                a: {
                                                    display: 'inline',
                                                    color: orange[600],
                                                    fontWeight: 500,

                                                    '&:hover': {
                                                        textDecoration: 'underline',
                                                    },
                                                },
                                            }}
                                        >
                                            <Link to="/products">Go to shopping here.</Link>
                                        </Typography>
                                    </Typography>
                                </Box>
                            </>
                        )}
                        {cartList?.length > 0 && (
                            <>
                                <Box flex={3.5}>
                                    <CartList cartList={cartList} onRemoveClick={handleOpenModal} />
                                </Box>
                                <Box flex={1}>
                                    <CartTotal />
                                </Box>
                            </>
                        )}
                    </Box>
                </>
            )}
            {!user && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    <Box width="400px" mb="16px">
                        <img src={CartEmpty} alt="" />
                    </Box>
                    <Typography>
                        Please login to buy bag, accessory, clothing.{' '}
                        <Typography
                            component="span"
                            color={orange[600]}
                            sx={{
                                a: {
                                    display: 'inline',
                                    color: orange[600],
                                    fontWeight: 500,

                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                },
                            }}
                        >
                            <Link to="/login">Login here.</Link>
                        </Typography>
                    </Typography>
                </Box>
            )}
            <Modal open={open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: '16px 22px',
                        borderRadius: '5px',
                    }}
                >
                    <Typography
                        variant="p"
                        component="h2"
                        mb="20px"
                        sx={{
                            fontFamily: '"Poppins", sans-serif',
                            fontWeight: 500,
                            fontSize: '1.5rem',
                            color: grey[900],
                            borderBottom: `1px solid ${grey[300]}`,
                            p: '12px 0',
                        }}
                    >
                        Are you sure want to remove{' '}
                        <Typography
                            color={orange[500]}
                            variant="p"
                            component="span"
                            fontWeight={600}
                        >
                            {name}
                        </Typography>
                        ?
                    </Typography>
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                mr: '8px',
                            }}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: red[400],
                                '&:hover': {
                                    backgroundColor: red[700],
                                },
                            }}
                            onClick={handleRemoveCart}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal open={openRemoveAll}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: '16px 22px',
                        borderRadius: '5px',
                    }}
                >
                    <Typography
                        variant="p"
                        component="h2"
                        mb="20px"
                        sx={{
                            fontFamily: '"Poppins", sans-serif',
                            fontWeight: 500,
                            fontSize: '1.5rem',
                            color: grey[900],
                            borderBottom: `1px solid ${grey[300]}`,
                            p: '12px 0',
                        }}
                    >
                        Are you sure want to remove all cart?
                    </Typography>
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                mr: '8px',
                            }}
                            onClick={handleCloseRemoveAll}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: red[400],
                                '&:hover': {
                                    backgroundColor: red[700],
                                },
                            }}
                            onClick={handleRemoveAllCart}
                        >
                            Delete all
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default Cart
