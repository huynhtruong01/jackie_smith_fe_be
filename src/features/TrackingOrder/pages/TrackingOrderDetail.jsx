import DeleteIcon from '@mui/icons-material/Delete'
import {
    Box,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import categoriesApi from '../../../api/categoriesApi'
import colorsApi from '../../../api/colorsApi'
import ordersApi from '../../../api/ordersApi'
import stylesApi from '../../../api/stylesApi'
import ButtonOrange from '../../../components/ButtonOrange'
import LoadingCircle from '../../../components/Loading/LoadingCircle'
import TableDataBody from '../../../components/TableData/TableDataBody'
import TableHeader from '../../../components/TableData/TableHeader'
import { formatColor } from '../../../utils/color'
import { formatCapitalize, formatPrice } from '../../../utils/common'

TrackingOrderDetail.propTypes = {}

function TrackingOrderDetail() {
    const { id } = useParams()
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState([])
    const [modeOrder, setModeOrder] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const getOrder = async () => {
            try {
                setLoading(true)

                const order = await ordersApi.getById(id)

                const newProductList = await order.items.map(async (x) => {
                    const category = await categoriesApi.getById(x.product.category)
                    const color = await colorsApi.getById(x.product.color)
                    const style = await stylesApi.getById(x.product.style)

                    return {
                        id: x.product._id,
                        image: x.product.image,
                        name: x.product.name,
                        category: formatCapitalize(category.name),
                        price: formatPrice(x.product.salePrice),
                        quantity: x.quantity,
                        color: formatColor(color.name),
                        style: formatCapitalize(style.name),
                        type: 'tracking detail',
                    }
                })

                const newList = await Promise.all(newProductList)

                setProductList(newList)
                setModeOrder(order?.mode)
            } catch (error) {
                console.log(error)
            }

            setLoading(false)
        }

        getOrder()
    }, [])

    const dataHeader = ['Id', 'Image', 'Name', 'Category', 'Price', 'Quantity', 'Color', 'Style']

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
        <Box p="16px 0">
            {loading && <LoadingCircle />}
            {!loading && (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            mb: '16px',
                            p: '0 16px',
                        }}
                    >
                        <Box
                            component="h3"
                            sx={{
                                color: orange[700],
                            }}
                        >
                            {selected.length === 0 && 'Products'}
                            {selected.length > 0 && (
                                <>
                                    {`${selected.length}`}
                                    <Box
                                        component="span"
                                        sx={{
                                            color: grey[800],
                                        }}
                                    >
                                        {' '}
                                        products
                                    </Box>
                                </>
                            )}
                        </Box>
                        <Box>
                            <ButtonOrange
                                icon={DeleteIcon}
                                disabled={selected.length === 0 && modeOrder !== 'approves'}
                                text={
                                    selected.length < productList.length ? 'Delete' : 'Delete all'
                                }
                            />
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
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
                    </TableContainer>
                </>
            )}
        </Box>
    )
}

export default TrackingOrderDetail
