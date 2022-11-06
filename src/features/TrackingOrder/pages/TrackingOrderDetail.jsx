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
    Typography,
} from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
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
import TrackingOrderTableApproves from '../components/TrackingOrderTableApproves'
import TrackingOrderTableData from '../components/TrackingOrderTableData'

TrackingOrderDetail.propTypes = {}

function TrackingOrderDetail() {
    const { id } = useParams()
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState([])
    const [modeOrder, setModeOrder] = useState('')
    const navigate = useNavigate()

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

    // handle delete tracking order
    const handleDeleteTrackingOrder = async () => {
        try {
            await ordersApi.updateProductTrackingOrder(id, { productIdList: selected })
            toast.success('Delete product success.', {
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/tracking-order'), 3000)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <Box p="16px 0">
            {loading && <LoadingCircle />}
            {!loading && (
                <>
                    <Box>
                        {modeOrder === 'approves' && (
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
                                        disabled={selected.length === 0 && modeOrder === 'approves'}
                                        text={
                                            selected.length < productList.length
                                                ? 'Delete'
                                                : 'Delete all'
                                        }
                                        onClick={handleDeleteTrackingOrder}
                                    />
                                </Box>
                            </Box>
                        )}
                        {modeOrder !== 'approves' && (
                            <Typography component="h3" variant="h5">
                                List product
                            </Typography>
                        )}
                    </Box>

                    <TableContainer component={Paper}>
                        {modeOrder === 'approves' && (
                            <TrackingOrderTableApproves
                                productList={productList}
                                dataHeader={dataHeader}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        {modeOrder !== 'approves' && (
                            <TrackingOrderTableData
                                dataHeader={dataHeader}
                                productList={productList}
                            />
                        )}
                    </TableContainer>
                </>
            )}
            <ToastContainer />
        </Box>
    )
}

export default TrackingOrderDetail
