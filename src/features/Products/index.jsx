import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'

Products.propTypes = {}

function Products() {
    return (
        <Box p="20px">
            <Routes>
                <Route path="" element={<ListPage />} />
                <Route path="/:id" element={<DetailPage />} />
            </Routes>
        </Box>
    )
}

export default Products
