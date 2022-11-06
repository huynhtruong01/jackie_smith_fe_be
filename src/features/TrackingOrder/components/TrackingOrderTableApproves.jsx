import { Checkbox, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { orange } from '@mui/material/colors'
import React from 'react'
import TableDataBody from '../../../components/TableData/TableDataBody'
import TableHeader from '../../../components/TableData/TableHeader'

TrackingOrderTableApproves.propTypes = {}

function TrackingOrderTableApproves({
    dataHeader,
    productList = [],
    selected = [],
    setSelected = null,
}) {
    // check selected items
    const isSelected = (id) => selected.indexOf(id) !== -1

    // handle checked item
    const handleItemChecked = (e, id) => {
        const isChecked = selected.indexOf(id) !== -1
        const newSelected = [...selected]
        if (!isChecked) {
            newSelected.push(id)
            setSelected(newSelected)
            return
        }

        const index = selected.indexOf(id)
        newSelected.splice(index, 1)

        setSelected(newSelected)
    }

    return (
        <Table sx={{ width: '100%' }}>
            <TableHeader
                data={dataHeader}
                productList={productList}
                isCheckBox={true}
                setSelected={setSelected}
                selected={selected}
            />
            <TableBody>
                {productList.length !== 0 &&
                    productList?.map((x, index) => (
                        <TableRow key={`${x.id}${index}`}>
                            <TableCell>
                                <Checkbox
                                    checked={isSelected(x.id)}
                                    onChange={(e) => handleItemChecked(e, x.id)}
                                    sx={{
                                        color: orange[500],
                                        '&.Mui-checked': {
                                            color: orange[500],
                                        },
                                    }}
                                />
                            </TableCell>
                            <TableDataBody data={x} />
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}

export default TrackingOrderTableApproves
