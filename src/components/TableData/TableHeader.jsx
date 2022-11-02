import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material'
import { orange } from '@mui/material/colors'
import React, { useState } from 'react'
import { formatCapitalize } from '../../utils/common'

TableHeader.propTypes = {}

function TableHeader({
    data = [],
    productList = [],
    selected = false,
    setSelected = null,
    isCheckBox = false,
}) {
    const handleSelectAllClick = (e) => {
        const newProductList = [...productList]
        console.log(e.target.checked)

        if (e.target.checked) {
            const newSelected = newProductList.map((n) => n.id)
            setSelected(newSelected)
            return
        }
        setSelected([])
    }

    return (
        <TableHead>
            <TableRow>
                {isCheckBox && (
                    <TableCell>
                        <Checkbox
                            onChange={handleSelectAllClick}
                            sx={{
                                color: orange[500],
                                '&.Mui-checked': {
                                    color: orange[500],
                                },
                                svg: {
                                    path: { color: orange[500] },
                                },
                            }}
                            checked={selected.length > 0}
                            indeterminate={
                                selected.length > 0 && selected.length < productList.length
                            }
                        />
                    </TableCell>
                )}
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
