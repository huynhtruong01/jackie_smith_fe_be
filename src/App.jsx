import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import NotFound from './components/NotFound'
import ScrollTop from './components/ScrollTop'
import AccountInfo from './features/AccountInfo'
import ChangePasswordUser from './features/Auth/pages/ChangePasswordUser'
import ForgotPassword from './features/Auth/pages/ForgotPassword'
import Login from './features/Auth/pages/Login'
import Register from './features/Auth/pages/Register'
import Cart from './features/Cart'
import ChangeInfo from './features/ChangeInfo'
import ChangePassword from './features/ChangePassword'
import Checkout from './features/Checkout'
import Footer from './features/Footer'
import Header from './features/Header'
import Home from './features/Home'
import PaymentDirectly from './features/PaymentDirectly'
import PaymentStripe from './features/PaymentStripe'
import Products from './features/Products'
import TrackingOrder from './features/TrackingOrder'

function App() {
    return (
        <Box>
            {/* Scroll top */}
            <ScrollTop />

            {/* Header */}
            <Header />

            {/* Main */}
            <Box
                component="main"
                pt="64px"
                backgroundColor={grey[50]}
                minHeight="calc(100vh - 64px)"
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="products/*" element={<Products />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="account" element={<AccountInfo />} />
                    <Route path="change-password" element={<ChangePassword />} />
                    <Route path="setting-account" element={<ChangeInfo />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="change-password-account" element={<ChangePasswordUser />} />
                    <Route path="payment-online" element={<PaymentStripe />} />
                    <Route path="payment-directly" element={<PaymentDirectly />} />
                    <Route path="tracking-order/*" element={<TrackingOrder />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    )
}

export default App
