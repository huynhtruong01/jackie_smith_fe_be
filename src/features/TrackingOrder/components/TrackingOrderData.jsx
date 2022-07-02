import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paper, Table, TableBody, TableContainer, TableRow } from '@mui/material'
import TableHeader from '../../../components/TableData/TableHeader'
import { formatPrice } from '../../../utils/common'
import TableDataBody from '../../../components/TableData/TableDataBody'

TrackingOrderData.propTypes = {}

function TrackingOrderData({ trackingOrderList = [] }) {
    const dataHeader = [
        'Id',
        'Name',
        'Email',
        'Address',
        'Phone number',
        'Total price',
        'Total quantity',
        'Mode',
        'Option',
    ]

    const dataBody = trackingOrderList.map((order) => ({
        id: order?._id,
        name: order?.fullname,
        email: order?.email,
        address: order?.address,
        phoneNumber: order?.phoneNumber,
        totalPrice: formatPrice(order?.totalPrice),
        totalQuantity: order?.totalQuantity,
        mode: order?.mode === 'approved' ? 'shipping' : order?.mode,
        type: 'tracking order',
    }))

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }}>
                    <TableHeader data={dataHeader} />
                    <TableBody>
                        {dataBody?.map((x, index) => (
                            <TableRow key={`${x.id}${index}`}>
                                <TableDataBody data={x} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default TrackingOrderData
