import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import TrackingOrderDetail from './pages/TrackingOrderDetail'
import TrackingOrderHome from './pages/TrackingOrderHome'

TrackingOrder.propTypes = {}

function TrackingOrder() {
    return (
        <Box p="20px" pt="8px">
            <Routes>
                <Route path="/" element={<TrackingOrderHome />} />
                <Route path="/:id" element={<TrackingOrderDetail />} />
            </Routes>
        </Box>
    )
}

export default TrackingOrder
