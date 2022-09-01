import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import categoriesApi from '../../../api/categoriesApi'
import colorsApi from '../../../api/colorsApi'
import productsApi from '../../../api/productsApi'
import stylesApi from '../../../api/stylesApi'
import { formatCapitalize } from '../../../utils/common'
import FilterByPrice from '../components/Filters/FilterByPrice'
import FilterSort from '../components/Filters/FilterSort'
import ProductFilter from '../components/Filters/ProductFilter'
import ProductFilterArr from '../components/Filters/ProductFilterArr'
import ProductClearAll from '../components/ProductClearAll'
import ProductEmpty from '../components/ProductEmpty'
import ProductList from '../components/ProductList'
import ProductPagination from '../components/ProductPagination'
import ProductSearch from '../components/ProductSearch'
import CategoryListSkeleton from '../components/Skeleton/CategoryListSkeleton'
import ProductListSkeleton from '../components/Skeleton/ProductListSkeleton'

ListPage.propTypes = {}

function ListPage() {
    const [productList, setProductList] = useState([])
    const [colorList, setColorList] = useState([])
    const [styleList, setStyleList] = useState([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState(10)
    const [searchParams] = useSearchParams()
    const [filters, setFilters] = useState(() => {
        const value = searchParams.get('category')
        const initFilters = {
            limit: 12,
            page: 1,
            sort: 'salePrice',
        }
        if (value) {
            initFilters.category = value
        }

        return initFilters
    })

    const navigate = useNavigate()

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            try {
                const { products, totalCount } = await productsApi.getAll(filters)
                if (filters['salePrice[gte]'] || filters['salePrice[lte]']) {
                    let count = null
                    const productsByPrice = await productsApi.getAll(filters)
                    count = productsByPrice.length
                    setProductList(productsByPrice)
                    setPagination(count)
                    return
                }

                setProductList(products)
                setPagination(totalCount)
                console.log(products, totalCount)
            } catch (error) {
                console.log('Error: ', error)
            }
            setLoading(false)
        }

        getProducts()
    }, [filters])

    // color
    useEffect(() => {
        const getColors = async () => {
            try {
                const { colors } = await colorsApi.getAll()
                const { styles } = await stylesApi.getAll()

                const newColors = colors.map((x) => ({ _id: x._id, name: x.name }))
                const newStyles = styles.map((x) => ({ _id: x._id, name: x.name }))

                setColorList(newColors)
                setStyleList(newStyles)
            } catch (error) {
                console.log('Colors error: ', error)
            }
        }

        getColors()
    }, [])

    useEffect(() => {
        navigate({
            pathname: '',
            search: `?${createSearchParams(filters).toString()}`,
        })
    }, [filters])

    // clear all change
    const handleClearAllChange = (newFilters) => {
        setFilters(newFilters)
    }

    // pagination
    const handlePaginationChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage }))
    }

    // category change
    const handleFilterCategory = async (value) => {
        try {
            console.log(value)

            if (value === '') {
                const newFilters = { ...filters, page: 1 }
                delete newFilters.category

                const { styles } = await stylesApi.getAll()
                const newStyles = styles.map((x) => ({ _id: x._id, name: x.name }))

                setStyleList(newStyles)
                setFilters(newFilters)
                return
            }

            // const category = await categoriesApi.getById(value)
            // console.log(category)

            // fetch styleList by stylesApi
            const { styles } = await stylesApi.getByCategory(value)
            // console.log(styles)
            const newStyleList = styles.map((x) => ({ _id: x._id, name: x.name }))
            setStyleList(newStyleList)

            setFilters((prev) => ({ ...prev, category: value, page: 1 }))
        } catch (error) {
            console.log('Categories filter: ', error)
        }
    }

    // filter by style
    const handleFilterStyle = (value) => {
        const newFilters = { ...filters }
        if (value === '') {
            delete newFilters.style
            setFilters(newFilters)

            return
        }

        newFilters.style = value
        setFilters(newFilters)
    }

    // filter by color
    const handleColorFilter = (value) => {
        const newFilters = { ...filters }

        if (value === '') {
            delete newFilters.color
            setFilters(newFilters)

            return
        }

        newFilters.color = value
        setFilters(newFilters)
    }

    // filter price
    const handleFilterPrice = (value1, value2) => {
        setFilters((prev) => ({
            ...prev,
            ['salePrice[gte]']: value1,
            ['salePrice[lte]']: value2,
        }))
    }

    // filter sort
    const handleSortChange = (value) => {
        setFilters((prev) => ({ ...prev, sort: value, page: 1 }))
    }

    // filter search
    const handleSearch = (value) => {
        setFilters((prev) => ({ ...prev, search: formatCapitalize(value) }))
    }

    return (
        <Box>
            <Box mb="16px">
                <ProductSearch onSubmit={handleSearch} />
            </Box>
            <Box display="flex" gap="16px">
                <Box flex={1} position="relative">
                    <Box
                        p="12px"
                        position="sticky"
                        top="100px"
                        overflow="auto"
                        height="100vh"
                        pb="100px"
                        backgroundColor="#fff"
                        borderRadius="5px"
                    >
                        <Box>
                            <ProductClearAll filters={filters} onChange={handleClearAllChange} />
                            <Box>
                                <ProductFilter
                                    filters={filters}
                                    title="Categories"
                                    api={categoriesApi}
                                    onChange={handleFilterCategory}
                                />
                            </Box>
                            <Box p="10px 0" borderTop={`1px solid ${grey[300]}`}>
                                <ProductFilterArr
                                    filters={filters}
                                    title="Style"
                                    data={styleList}
                                    onChange={handleFilterStyle}
                                    loading={loading}
                                />
                            </Box>
                            <Box p="10px 0" borderTop={`1px solid ${grey[300]}`}>
                                <ProductFilterArr
                                    filters={filters}
                                    title="Color"
                                    data={colorList}
                                    onChange={handleColorFilter}
                                    isColor={true}
                                />
                            </Box>
                            <FilterByPrice onClick={handleFilterPrice} />
                        </Box>
                    </Box>
                </Box>
                <Box flex={4} backgroundColor="#fff" p="12px" borderRadius="5px">
                    <FilterSort filters={filters} onChange={handleSortChange} />
                    {productList?.length > 0 && (
                        <>
                            <ProductList productList={productList} />
                            <ProductPagination
                                count={pagination}
                                page={filters.page}
                                onChange={handlePaginationChange}
                            />
                        </>
                    )}
                    {loading && <ProductListSkeleton limit={filters.limit} />}
                    {!loading && productList?.length === 0 && <ProductEmpty />}
                </Box>
            </Box>
        </Box>
    )
}

export default ListPage
