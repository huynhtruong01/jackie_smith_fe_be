import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CardDetail from '../components/CardDetail'
import CategoryList from '../components/CategoryList'
import { categoryList } from '../utils/common'
import SliderProducts from './SliderProducts'

Home.propTypes = {}

function Home() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true)
                const categories = await categoryList()
                setCategories(categories)
            } catch (error) {
                console.log('Error: ', error)
            }

            setLoading(false)
        }

        getCategories()
    }, [])

    return (
        <Box>
            <CategoryList categoryList={categories} loading={loading} />
            <CardDetail
                item={{
                    title: 'Dear flat backpack',
                    img: 'https://cdn.shopify.com/s/files/1/0208/1956/files/E_0279_IM_WebFlora-D1_540x.jpg?v=1652971173',
                    desc: 'This is the product best selling in 2022 ',
                }}
            />
            <SliderProducts />
        </Box>
    )
}

export default Home
