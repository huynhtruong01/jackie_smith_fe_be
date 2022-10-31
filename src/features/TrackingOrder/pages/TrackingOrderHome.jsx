import CachedIcon from '@mui/icons-material/Cached'
import { Box, Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
        const getOrders = async () => {
            try {
                setLoading(true)
                const { orders } = await ordersApi.getAllByUserIdOther({ userId: user._id })
                const ordersByUserIdList = await ordersApi.getAllByUserId({ userId: user._id })
                setTrackingOrderList(orders)
                dispatch(addTrackingOrderUser(ordersByUserIdList.orders))
                // console.log(orders)
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
            {!loading && (
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
        </Box>
    )
}

export default TrackingOrderHome
