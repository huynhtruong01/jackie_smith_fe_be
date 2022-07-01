import React from 'react'
import PropTypes from 'prop-types'
import { Box, TableCell, TableHead, TableRow } from '@mui/material'
import { formatCapitalize } from '../../utils/common'

TableHeader.propTypes = {}

function TableHeader({ data = [] }) {
    return (
        <TableHead>
            <TableRow>
                {data?.map((x) => (
                    <TableCell key={x} align="center">
                        {formatCapitalize(x)}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default TableHeader
