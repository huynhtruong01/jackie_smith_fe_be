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
                backgroundColor: '#fff',
                overflow: 'hidden',
                width: '300px',
            }}
        >
            <InputBase
                sx={{
                    color: 'inherit',
                    '& .MuiInputBase-input': {
                        padding: '12px',
                    },
                    width: '100%',
                    border: `2px solid ${orange[300]}`,
                    borderRadius: '5px',

                    '&:hover': {
                        backgroundColor: '#fff',
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
                        color: '#fff',
                    }}
                />
            </Box>
        </Box>
    )
}

export default ProductSearch
