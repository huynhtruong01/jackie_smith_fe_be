import SearchIcon from '@mui/icons-material/Search'
import { Box, InputBase } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { useState } from 'react'

ProductSearch.propTypes = {}

function ProductSearch({ onSubmit = null }) {
    const [value, setValue] = useState('')

    const handleSearchChange = () => {
        if (!onSubmit || !value) return
        onSubmit(value)
        setValue('')
    }

    return (
        <Box
            sx={{
                position: 'relative',
                borderRadius: '5px',
                backgroundColor: orange[100],
                overflow: 'hidden',
                width: '300px',
            }}
        >
            <InputBase
                sx={{
                    color: 'inherit',
                    '& .MuiInputBase-input': {
                        padding: '8px',
                    },
                    width: '100%',

                    '&:hover': {
                        backgroundColor: orange[200],
                    },
                }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search..."
            />
            <Box
                sx={{
                    padding: '0 16px',
                    height: '100%',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: orange[300],
                    cursor: 'pointer',
                    transition: '.2s ease-in-out',

                    '&:hover': {
                        backgroundColor: orange[500],
                    },
                }}
                onClick={handleSearchChange}
            >
                <SearchIcon
                    sx={{
                        color: grey[700],
                    }}
                />
            </Box>
        </Box>
    )
}

export default ProductSearch
