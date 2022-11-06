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
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material'
import { blue, grey, orange } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getNameUser } from '../utils/common'
import { logout } from './Auth/userSlice'
import { totalQuantity } from './Cart/cartSelector'
import { hideCart, resetCart } from './Cart/cartSlice'
import { resetTrackingOrder, resetTrackingOrderUser } from './TrackingOrder/trackingOrderSlice'

Header.propTypes = {}

function Header() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [active, setActive] = useState(false)
    const totalQuantityCart = useSelector(totalQuantity)
    const isShowCart = useSelector((state) => state.cart.isShowCart)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const user = useSelector((state) => state.user2.currentUser)
    const trackingByUserOrderList = useSelector(
        (state) => state.trackingOrder.trackingByUserOrderList
    )

    // header active when scroll
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setActive(true)
        } else {
            setActive(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // handle go to cart
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

    // menu list
    const menuLinkList = [
        {
            link: `${user ? '/products' : '/login'}`,
            path: '/products',
            name: 'Products',
        },
        {
            link: `${user ? '/our-community' : '/login'}`,
            path: '/our-community',
            name: 'Our Community',
        },
    ]

    return (
        <Box component="header">
            <AppBar
                className={active ? 'active' : ''}
                sx={{
                    position: 'fixed',
                    backgroundColor: '#fff',
                    transition: '.2s ease-in-out',
                    boxShadow: 'none',

                    '&.active': {
                        boxShadow: '0px 5px 10px #0000000F',
                    },
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        backgroundColor: '#fff',
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
                                sx={{
                                    flex: 1,
                                    color: grey[800],
                                    fontWeight: 'bold',
                                    fontSize: 'x-large',
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        color: orange[700],
                                    }}
                                >
                                    J
                                </Box>
                                ackie{' '}
                                <Box
                                    component="span"
                                    sx={{
                                        color: blue[900],
                                    }}
                                >
                                    S
                                </Box>
                                mith
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
                                    className={
                                        location.pathname.startsWith(menu.path) ? 'active' : ''
                                    }
                                    sx={{
                                        mr: '12px',

                                        '&:hover': {
                                            backgroundColor: orange[50],
                                        },

                                        '&.active': {
                                            backgroundColor: orange[500],

                                            a: {
                                                color: '#fff',
                                            },
                                        },

                                        '& > a': {
                                            color: orange[600],
                                            fontWeight: 600,
                                        },
                                    }}
                                >
                                    <Link to={menu.link}>{menu.name}</Link>
                                </Button>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                position: 'relative',
                                flex: '1 1 0',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',

                                '& a': {
                                    display: 'inline-block',
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
                                    <Box
                                        sx={{
                                            mr: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            endIcon={<ArrowDropDownIcon />}
                                            sx={{
                                                color: orange[600],
                                                fontSize: '13px',
                                                backgroundColor: orange[50],
                                                '&:hover': {
                                                    backgroundColor: orange[600],
                                                    color: '#fff',
                                                },
                                            }}
                                        >
                                            Hi, {getNameUser(user.user.fullname)}
                                        </Button>
                                        <Link to="/tracking-order">
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
                                                <Badge
                                                    badgeContent={
                                                        trackingByUserOrderList.length || '0'
                                                    }
                                                    color="error"
                                                >
                                                    <NotificationsIcon />
                                                </Badge>
                                            </IconButton>
                                        </Link>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <Link to="/account">
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
                                                    Setting
                                                </MenuItem>
                                            </Link>
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
                                    <Link to="/cart">
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
                                            <Badge
                                                badgeContent={totalQuantityCart || '0'}
                                                color="error"
                                            >
                                                <ShoppingCartIcon />
                                            </Badge>
                                        </IconButton>
                                    </Link>
                                </>
                            )}
                            <Box
                                className={isShowCart ? 'active' : ''}
                                // className={'active'}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: orange[500],
                                    position: 'absolute',
                                    top: '50px',
                                    right: 0,
                                    backgroundColor: '#fff',
                                    p: '8px 16px',
                                    borderRadius: '3px',
                                    border: `1px solid ${orange[500]}`,
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
                                <span>Go to cart</span>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}

export default Header
