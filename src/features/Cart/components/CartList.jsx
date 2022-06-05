import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import { orange, red } from '@mui/material/colors'
import React from 'react'
import { formatPrice } from '../../../utils/common'
import QuantityCartForm from './QuantityCartForm'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import cartsApi from '../../../api/cartsApi'
import { useSelector } from 'react-redux'

CartList.propTypes = {}

function CartList({ cartList = [], onRemoveClick = null }) {
    const user = useSelector((state) => state.user2.currentUser)
    const handleRemoveCart = (id, name) => {
        if (!onRemoveClick) return
        onRemoveClick({ isOpen: true, id, name })
    }

    const handleSubmit = async (product, quantity) => {
        try {
            const cartItemDB = {
                userId: user.user._id,
                product: product._id,
                quantity,
            }
            await cartsApi.updateQuantity(cartItemDB)
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    }

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Promotion percent</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Total price</TableCell>
                            <TableCell align="center">Option</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartList?.map((cart, index) => (
                            <TableRow key={cart?.product?._id}>
                                <TableCell
                                    align="center"
                                    sx={{
                                        color: red[500],
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                    }}
                                >
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">
                                    <Box width="80px">
                                        <img src={cart?.product?.image} alt={cart?.product?.name} />
                                    </Box>
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        'a:hover': {
                                            textDecoration: 'underline',
                                            color: orange[500],
                                        },
                                    }}
                                >
                                    <Link to={`/products/${cart?.product?._id}`}>
                                        {cart?.product?.name}
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                    {formatPrice(cart?.product?.salePrice)}
                                </TableCell>
                                <TableCell align="center">
                                    {cart?.product?.promotionPercent <= 0
                                        ? `0%`
                                        : `-${cart?.product?.promotionPercent}%`}
                                </TableCell>
                                <TableCell align="center">
                                    <QuantityCartForm
                                        id={cart?.product?._id}
                                        quantity={cart?.quantity}
                                        onSubmit={(quantity) =>
                                            handleSubmit(cart?.product, quantity)
                                        }
                                    />
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        color: orange[500],
                                        fontWeight: 500,
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    {formatPrice(
                                        Number.parseInt(cart?.product?.salePrice) *
                                            Number.parseInt(cart?.quantity)
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        onClick={() =>
                                            handleRemoveCart(
                                                cart?.product?._id,
                                                cart?.product?.name
                                            )
                                        }
                                    >
                                        <DeleteIcon
                                            sx={{
                                                color: orange[400],
                                            }}
                                        />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default CartList
