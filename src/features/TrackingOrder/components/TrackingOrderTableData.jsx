import { Table, TableBody } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import TableDataBody from '../../../components/TableData/TableDataBody'
import TableHeader from '../../../components/TableData/TableHeader'

TrackingOrderTableData.propTypes = {}

function TrackingOrderTableData({ dataHeader, productList = [] }) {
    return (
        <Table sx={{ width: '100%' }}>
            <TableHeader data={dataHeader} productList={productList} />
            <TableBody>
                {productList.length !== 0 &&
                    productList?.map((x, index) => (
                        <TableRow key={`${x.id}${index}`}>
                            <TableDataBody data={x} />
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}

export default TrackingOrderTableData
