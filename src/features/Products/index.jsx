import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DetailPage from './pages/DetailPage'
import ListPage from './pages/ListPage'

Products.propTypes = {}

function Products() {
    window.scrollTo(0, 0)

    return (
        <Box p="20px" pt="16px">
            <Routes>
                <Route path="" element={<ListPage />} />
                <Route path="/:id" element={<DetailPage />} />
            </Routes>
        </Box>
    )
}

export default Products
