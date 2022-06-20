import { Box, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import categoriesApi from '../../../api/categoriesApi'
import productsApi from '../../../api/productsApi'
import { colorList } from '../../../utils/colorList'
import { formatCapitalize } from '../../../utils/common'
import { styleList } from '../../../utils/styleList'
import FilterByPrice from '../components/Filters/FilterByPrice'
import FilterSort from '../components/Filters/FilterSort'
import ProductFilter from '../components/Filters/ProductFilter'
import ProductFilterArr from '../components/Filters/ProductFilterArr'
import ProductClearAll from '../components/ProductClearAll'
import ProductEmpty from '../components/ProductEmpty'
import ProductList from '../components/ProductList'
import ProductPagination from '../components/ProductPagination'
import ProductSearch from '../components/ProductSearch'

ListPage.propTypes = {}

function ListPage() {
    const [productList, setProductList] = useState([])
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
            try {
                const { products, totalCount } = await productsApi.getAll(filters)
                setProductList(products)
                setPagination(totalCount)
                console.log(products, totalCount)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getProducts()
    }, [filters])

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
    const handleCategoryChange = (value) => {
        if (value === '') {
            const newFilters = { ...filters, page: 1 }
            delete newFilters.category
            setFilters(newFilters)
            return
        }

        setFilters((prev) => ({ ...prev, category: value, page: 1 }))
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
        setFilters((prev) => ({ ...prev, sort: value }))
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
                            <ProductFilter
                                filters={filters}
                                title="Categories"
                                api={categoriesApi}
                                onChange={handleCategoryChange}
                            />
                            <ProductFilterArr
                                filters={filters}
                                title="Style"
                                data={styleList}
                                onChange={handleFilterStyle}
                            />
                            <ProductFilterArr
                                filters={filters}
                                title="Color"
                                data={colorList}
                                onChange={handleColorFilter}
                            />
                            <FilterByPrice onClick={handleFilterPrice} />
                        </Box>
                    </Box>
                </Box>
                <Box flex={4} backgroundColor="#fff" p="12px" borderRadius="5px">
                    {productList?.length > 0 && (
                        <>
                            <FilterSort filters={filters} onChange={handleSortChange} />
                            <ProductList productList={productList} />
                            <ProductPagination
                                count={pagination}
                                page={filters.page}
                                onChange={handlePaginationChange}
                            />
                        </>
                    )}
                    {productList?.length === 0 && <ProductEmpty />}
                </Box>
            </Box>
        </Box>
    )
}

export default ListPage
