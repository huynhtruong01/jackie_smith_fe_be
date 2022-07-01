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
import Checkout from './features/Checkout'
import AccountInfo from './features/AccountInfo'
import ChangePassword from './features/ChangePassword'
import ChangeInfo from './features/ChangeInfo'
import ForgotPassword from './features/Auth/pages/ForgotPassword'
import ChangePasswordUser from './features/Auth/pages/ChangePasswordUser'
import PaymentStripe from './features/PaymentStripe'
import PaymentDirectly from './features/PaymentDirectly'
import TrackingOrder from './features/TrackingOrder'
import NotFound from './components/NotFound'

function App() {
    return (
        <Box>
            <Header />
            <Box pt="64px" backgroundColor={grey[50]} minHeight="calc(100vh - 100px)">
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
            <Footer />
        </Box>
    )
}

export default App
