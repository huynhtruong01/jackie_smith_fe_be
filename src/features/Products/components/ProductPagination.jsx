import React from 'react'
import PropTypes from 'prop-types'
import { Box, Pagination } from '@mui/material'
import { orange } from '@mui/material/colors'

ProductPagination.propTypes = {}

function ProductPagination({ count = 10, page = 1, onChange = null }) {
    const handlePageChange = (e, page) => {
        if (!onChange) return
        onChange(page)
    }

    return (
        <Box p="40px" display="flex" justifyContent="center" alignItems="center">
            <Pagination
                count={Math.ceil(count / 12) || 3}
                page={page}
                onChange={handlePageChange}
                sx={{
                    '& .MuiButtonBase-root': {
                        '&:hover': {
                            backgroundColor: orange[300],
                            color: '#fff',
                        },
                    },

                    '& .MuiButtonBase-root.Mui-selected': {
                        backgroundColor: orange[400],
                        color: '#fff',

                        '&:hover': {
                            backgroundColor: orange[700],
                        },
                    },
                }}
            />
        </Box>
    )
}

export default ProductPagination
