import { Box, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ButtonOrange from '../../../components/ButtonOrange'
import { formatPrice } from '../../../utils/common'
import { addCheckout } from '../../Checkout/checkoutSlice'
import { totalPriceFromCart, totalQuantity } from '../cartSelector'

CartTotal.propTypes = {}

function CartTotal() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const quantity = useSelector(totalQuantity)
    const price = useSelector(totalPriceFromCart)
    const carts = useSelector((state) => state.cart.cartList)
    const idCart = useSelector((state) => state.cart.id)
    const user = useSelector((state) => state.user2.currentUser.user)

    const handlePayClick = () => {
        // add invoice
        const invoiceItem = {
            fullname: user.fullname,
            email: user.email,
            cartList: carts,
            totalPrice: price,
            totalQuantity: quantity,
        }
        dispatch(addCheckout(invoiceItem))
        navigate('/checkout')

        // add invoice into db
        // const date = generateDate()
        // const orderItem = {
        //     userId: user._id,
        //     address: user.address,
        //     phoneNumber: user.phoneNumber,
        //     productList: carts,
        //     totalPrice: price,
        //     totalQuantity: quantity,
        //     date,
        // }

        // console.log(orderItem)
        // await ordersApi.add(orderItem)

        // delete cart of user into db
        // await cartsApi.remove(idCart)

        // reset cart into redux
        // dispatch(resetCart())

        // nofitication
        // toast.success('Order product successfully', {
        //     autoClose: 2000,
        //     theme: 'colored',
        // })
    }

    return (
        <Box backgroundColor="#fff" borderRadius="5px" border={`1px solid ${grey[300]}`}>
            <Box p="12px">
                <Box p="12px 0">
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p="16px 0"
                        borderBottom={`1px solid ${grey[200]}`}
                    >
                        <Typography component="span" fontSize="0.9rem" color={orange[500]}>
                            Name
                        </Typography>
                        <Typography component="span" fontSize="0.9rem">
                            {user.fullname}
                        </Typography>
                    </Box>

                    {/* <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p="16px 0"
                    >
                        <Typography component="span" fontSize="0.9rem" color={orange[500]}>
                            Phone number
                        </Typography>
                        <Typography component="span" fontSize="0.9rem">
                            0{user.phoneNumber}
                        </Typography>
                    </Box> */}
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" p="12px 0">
                    <Typography component="span">Total</Typography>
                    <Typography
                        component="span"
                        fontSize="1.2rem"
                        color={orange[500]}
                        fontWeight={500}
                    >
                        {formatPrice(price)}
                    </Typography>
                </Box>
                <Box onClick={handlePayClick}>
                    <ButtonOrange text={`buy and pay (${carts?.length || 0})`} fullWidth />
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default CartTotal
