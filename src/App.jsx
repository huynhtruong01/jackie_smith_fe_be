import { useState } from 'react'
import './App.css'
import Header from './features/Header'
import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Home from './features/Home'
import Footer from './features/Footer'
import Products from './features/Products'
import Register from './features/Auth/pages/Register'
import { grey } from '@mui/material/colors'
import Cart from './features/Cart'
import Login from './features/Auth/pages/Login'
import Invoice from './features/Invoice'

function App() {
    return (
        <Box>
            <Header />
            <Box pt="75px" backgroundColor={grey[50]} minHeight="calc(100vh - 100px)">
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="products/*" element={<Products />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="invoice" element={<Invoice />} />
                </Routes>
            </Box>
            <Footer />
        </Box>
    )
}

export default App
