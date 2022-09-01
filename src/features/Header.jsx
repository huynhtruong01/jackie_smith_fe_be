import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
    AppBar,
    Badge,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material'
import { orange } from '@mui/material/colors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getNameUser } from '../utils/common'
import { logout } from './Auth/userSlice'
import { totalQuantity } from './Cart/cartSelector'
import { hideCart, resetCart } from './Cart/cartSlice'
import { resetTrackingOrder, resetTrackingOrderUser } from './TrackingOrder/trackingOrderSlice'

Header.propTypes = {}

function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const totalQuantityCart = useSelector(totalQuantity)
    const isShowCart = useSelector((state) => state.cart.isShowCart)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user2.currentUser)
    const trackingByUserOrderList = useSelector(
        (state) => state.trackingOrder.trackingByUserOrderList
    )

    const handleGoToCart = () => {
        dispatch(hideCart())
        navigate('/cart')
    }

    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    // logout
    const handleLogout = () => {
        dispatch(logout())
        dispatch(resetCart())
        dispatch(resetTrackingOrderUser())
        dispatch(resetTrackingOrder())
        setAnchorEl(null)
        navigate('/')
    }

    const menuLinkList = [
        {
            link: `${user ? '/products' : '/login'}`,
            name: 'Products',
        },
        {
            link: `${user ? '/our-community' : '/login'}`,
            name: 'Our Community',
        },
    ]

    return (
        <Box>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: '0 0 10px 0px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Toolbar
                    sx={{
                        backgroundColor: '#fff',
                        '& > a': {
                            flex: 1,
                        },
                    }}
                >
                    <Link to="/">
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flex: 1, color: orange[600], fontWeight: 600 }}
                        >
                            Jackie Smith
                        </Typography>
                    </Link>
                    <Box
                        sx={{
                            flex: 3,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {menuLinkList.map((menu) => (
                            <Button
                                key={menu.name}
                                sx={{
                                    mr: '12px',

                                    '&:hover': {
                                        backgroundColor: orange[50],
                                    },

                                    '& > a': {
                                        color: orange[600],
                                        fontWeight: 500,
                                    },
                                }}
                            >
                                <Link to={menu.link}>{menu.name}</Link>
                            </Button>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',

                            '& > a': {
                                display: 'inline',
                                color: '#fff',
                            },
                        }}
                    >
                        {!user && (
                            <Link to="/login">
                                <Button
                                    variant="contained"
                                    sx={{
                                        fontWeight: 500,
                                        backgroundColor: orange[300],

                                        '&:hover': {
                                            backgroundColor: orange[600],
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                        {user && (
                            <>
                                <Box mr="8px">
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        endIcon={<ArrowDropDownIcon />}
                                        sx={{
                                            color: orange[600],
                                            backgroundColor: orange[50],
                                            '&:hover': {
                                                backgroundColor: orange[600],
                                                color: '#fff',
                                            },
                                        }}
                                    >
                                        Hi, {getNameUser(user.user.fullname)}
                                    </Button>
                                    <IconButton
                                        sx={{
                                            ml: '8px',
                                            '&:hover': {
                                                backgroundColor: orange[50],
                                            },
                                            '& svg': {
                                                color: orange[500],
                                                width: '1.7rem',
                                                height: '1.7rem',
                                            },
                                        }}
                                    >
                                        <Link to="/tracking-order">
                                            <Badge
                                                badgeContent={trackingByUserOrderList.length}
                                                color="error"
                                            >
                                                <NotificationsIcon />
                                            </Badge>
                                        </Link>
                                    </IconButton>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem
                                            onClick={handleClose}
                                            sx={{
                                                width: '100%',
                                                p: '8px 10px 8px 7px',
                                            }}
                                        >
                                            <SettingsIcon
                                                sx={{
                                                    mr: '12px',
                                                    color: orange[500],
                                                }}
                                            />
                                            <Link to="/account">Setting</Link>
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleLogout}
                                            sx={{
                                                p: '8px 10px 8px 6px',
                                            }}
                                        >
                                            <ExitToAppIcon
                                                sx={{
                                                    mr: '12px',
                                                    color: orange[500],
                                                }}
                                            />
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </Box>
                                <IconButton
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: orange[50],
                                        },
                                        '& svg': {
                                            color: orange[500],
                                            width: '1.7rem',
                                            height: '1.7rem',
                                        },
                                    }}
                                >
                                    <Link to="/cart">
                                        <Badge
                                            badgeContent={totalQuantityCart || '0'}
                                            color="error"
                                        >
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </Link>
                                </IconButton>
                            </>
                        )}
                    </Box>
                    <Box
                        className={isShowCart ? 'active' : ''}
                        display="flex"
                        alignItems="center"
                        color={orange[500]}
                        position="fixed"
                        top="64px"
                        right="10px"
                        backgroundColor="#fff"
                        p="8px 16px"
                        borderRadius="3px"
                        border={`1px solid ${orange[500]}`}
                        sx={{
                            cursor: 'pointer',
                            transform: 'scale(0)',
                            transition: '.3s ease-in-out',

                            '&:hover': {
                                color: '#fff',
                                backgroundColor: orange[500],
                            },

                            '&.active': {
                                transform: 'scale(1)',
                            },
                        }}
                        onClick={handleGoToCart}
                    >
                        <CheckCircleIcon
                            sx={{
                                mr: '8px',
                            }}
                        />
                        <span>Go to cart to see more</span>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
