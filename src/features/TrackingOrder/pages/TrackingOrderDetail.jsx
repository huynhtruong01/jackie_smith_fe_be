import { Box } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ordersApi from '../../../api/ordersApi'

TrackingOrderDetail.propTypes = {}

function TrackingOrderDetail() {
    const { id } = useParams()
    const [productList, setProductList] = useState([])
    console.log(id)

    useEffect(() => {
        const getOrder = async () => {
            try {
                const order = await ordersApi.getById(id)
                setProductList(order.items)
            } catch (error) {
                console.log(error)
            }
        }

        getOrder()
    }, [])

    console.log(productList)

    return <Box>Detail</Box>
}

export default TrackingOrderDetail
