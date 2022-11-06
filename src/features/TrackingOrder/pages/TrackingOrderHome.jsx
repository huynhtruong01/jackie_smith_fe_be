import CachedIcon from '@mui/icons-material/Cached'
import { Box, Button, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ordersApi from '../../../api/ordersApi'
import ButtonOrange from '../../../components/ButtonOrange'
import LoadingCircle from '../../../components/Loading/LoadingCircle'
import { changeToggle } from '../../../redux/toggleSlice'
import TrackingOrderData from '../components/TrackingOrderData'
import { addTrackingOrder, addTrackingOrderUser } from '../trackingOrderSlice'

TrackingOrderHome.propTypes = {}

function TrackingOrderHome() {
    const [trackingOrderList, setTrackingOrderList] = useState([])
    const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state?.user2?.currentUser?.user)
    const isToggle = useSelector((state) => state.toggle.isToggle)
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const getOrders = async () => {
            try {
                setLoading(true)
                const { orders } = await ordersApi.getAllByUserIdOther({ userId: user._id })
                const ordersByUserIdList = await ordersApi.getAllByUserId({ userId: user._id })
                setTrackingOrderList(orders)
                dispatch(addTrackingOrderUser(ordersByUserIdList.orders))
            } catch (error) {
                console.log(error)
            }

            setLoading(false)
        }

        getOrders()
    }, [isToggle])

    const handleReload = () => {
        dispatch(changeToggle(!isToggle))
    }

    return (
        <Box p="16px 0">
            {loading && <LoadingCircle />}
            {!loading && trackingOrderList?.length > 0 && (
                <>
                    <Box mb="16px" display="flex" justifyContent="space-between">
                        <Typography variant="h6" component="h2" color={`${grey[900]}`}>
                            Tracking Order
                        </Typography>
                        <Box onClick={handleReload}>
                            <ButtonOrange icon={CachedIcon} text="Reload" />
                        </Box>
                    </Box>
                    <Box>
                        <TrackingOrderData trackingOrderList={trackingOrderList} />
                    </Box>
                </>
            )}
            {!loading && trackingOrderList.length === 0 && (
                <Box
                    component="p"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: grey[800],

                        '& a': {
                            display: 'inline-block',
                            color: orange[500],

                            '&:hover': {
                                color: orange[700],
                                textDecoration: 'underline',
                            },
                        },
                    }}
                >
                    <Typography
                        sx={{
                            p: '12px 18px',
                            borderRadius: '3px',
                            backgroundColor: '#fff',
                            fontWeight: 600,
                        }}
                    >
                        You don't have any order here.{' '}
                        <Link to="/products">Go to shop to buy.</Link>
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default TrackingOrderHome
