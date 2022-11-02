import { Box, LinearProgress } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import React, { Suspense, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LinearLoading from './components/Loading/LinearLoading'
import NotFound from './components/NotFound'
import ScrollTop from './components/ScrollTop'
// import AccountInfo from './features/AccountInfo'
// import ChangePasswordUser from './features/Auth/pages/ChangePasswordUser'
// import ForgotPassword from './features/Auth/pages/ForgotPassword'
// import Login from './features/Auth/pages/Login'
// import Register from './features/Auth/pages/Register'
// import Cart from './features/Cart'
// import ChangeInfo from './features/ChangeInfo'
// import ChangePassword from './features/ChangePassword'
// import Checkout from './features/Checkout'
import Footer from './features/Footer'
import Header from './features/Header'
import Home from './features/Home'
// import PaymentDirectly from './features/PaymentDirectly'
// import PaymentStripe from './features/PaymentStripe'
// import Products from './features/Products'
// import TrackingOrder from './features/TrackingOrder'

const ProductsLazy = React.lazy(() => import('./features/Products'))
const CartLazy = React.lazy(() => import('./features/Cart'))
const LoginLazy = React.lazy(() => import('./features/Auth/pages/Login'))
const RegisterLazy = React.lazy(() => import('./features/Auth/pages/Register'))
const CheckoutLazy = React.lazy(() => import('./features/Checkout'))
const AccountInfoLazy = React.lazy(() => import('./features/AccountInfo'))
const ChangePasswordUserLazy = React.lazy(() => import('./features/Auth/pages/ChangePasswordUser'))
const ChangeInfoLazy = React.lazy(() => import('./features/ChangeInfo'))
const ChangePasswordLazy = React.lazy(() => import('./features/ChangePassword'))
const ForgotPasswordLazy = React.lazy(() => import('./features/Auth/pages/ForgotPassword'))
const PaymentStripeLazy = React.lazy(() => import('./features/PaymentStripe'))
const PaymentDirectlyLazy = React.lazy(() => import('./features/PaymentDirectly'))
const TrackingOrderLazy = React.lazy(() => import('./features/TrackingOrder'))

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
                sx={{
                    position: 'relative',
                    pt: '64px',
                    backgroundColor: grey[50],
                    minHeight: 'calc(100vh - 64px)',
                }}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="products/*"
                        element={
                            <Suspense fallback={<LinearLoading top="64px" />}>
                                <ProductsLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="cart"
                        element={
                            <Suspense fallback={<LinearLoading top="64px" />}>
                                <CartLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="login"
                        element={
                            <Suspense fallback={<LinearLoading top="64px" />}>
                                <LoginLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="register"
                        element={
                            <Suspense fallback={<LinearLoading top="64px" />}>
                                <RegisterLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="checkout"
                        element={
                            <Suspense fallback={<LinearLoading top="64px" />}>
                                <CheckoutLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="account"
                        element={
                            <Suspense fallback={<LinearLoading top="64px" />}>
                                <AccountInfoLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="change-password"
                        element={
                            <Suspense fallback={<LinearLoading top="64px" />}>
                                <ChangePasswordLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="setting-account"
                        element={
                            <Suspense fallback={<LinearLoading top="64px" />}>
                                <ChangeInfoLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="forgot-password"
                        element={
                            <Suspense fallback={<LinearLoading top="64px" />}>
                                <ForgotPasswordLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="change-password-account"
                        element={
                            <Suspense fallback={<LinearLoading top="64px" />}>
                                <ChangePasswordUserLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="payment-online"
                        element={
                            <Suspense fallback={<LinearLoading top="64px" />}>
                                <PaymentStripeLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="payment-directly"
                        element={
                            <Suspense fallback={<LinearLoading top="64px" />}>
                                <PaymentDirectlyLazy />
                            </Suspense>
                        }
                    />
                    <Route
                        path="tracking-order/*"
                        element={
                            <Suspense fallback={<LinearLoading top="64px" />}>
                                <TrackingOrderLazy />
                            </Suspense>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    )
}

export default App
