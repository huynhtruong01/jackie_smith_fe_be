import { Box, Paper, Table, TableBody, TableContainer, TableRow } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import categoriesApi from '../../../api/categoriesApi'
import colorsApi from '../../../api/colorsApi'
import ordersApi from '../../../api/ordersApi'
import stylesApi from '../../../api/stylesApi'
import TableDataBody from '../../../components/TableData/TableDataBody'
import TableHeader from '../../../components/TableData/TableHeader'
import { formatColor } from '../../../utils/color'
import { formatCapitalize, formatPrice } from '../../../utils/common'

TrackingOrderDetail.propTypes = {}

function TrackingOrderDetail() {
    const { id } = useParams()
    const [productList, setProductList] = useState([])
    console.log(id)

    useEffect(() => {
        const getOrder = async () => {
            try {
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
                console.log(newList)
                setProductList(newList)
            } catch (error) {
                console.log(error)
            }
        }

        getOrder()
    }, [])

    const dataHeader = ['Id', 'Image', 'Name', 'Category', 'Price', 'Quantity', 'Color', 'Style']

    console.log(productList)

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }}>
                    <TableHeader data={dataHeader} />
                    <TableBody>
                        {productList.length !== 0 &&
                            productList?.map((x, index) => (
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

export default TrackingOrderDetail
