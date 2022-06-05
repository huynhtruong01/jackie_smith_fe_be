import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { formatCapitalize } from '../../../../utils/common'
import { grey, orange } from '@mui/material/colors'

ProductFilter.propTypes = {}

function ProductFilter({ filters, title = '', api, onChange = null }) {
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            try {
                const result = await api.getAll()
                const newCategoryList = result[title.toLowerCase()].map((category) => ({
                    name: category._id,
                    label: formatCapitalize(category.name),
                }))

                setCategoryList(newCategoryList)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getCategories()
    }, [])

    const handleChange = (e) => {
        if (!onChange) return
        if (e.target.name === 'all') {
            onChange('')
            return
        }

        onChange(e.target.name)
    }

    return (
        <Box p="10px 0" borderTop={`1px solid ${grey[300]}`}>
            <Box>
                <Typography
                    variant="h6"
                    component="h3"
                    fontWeight={500}
                    color={orange[500]}
                    fontSize="1rem"
                    mb="4px"
                >
                    {title}
                </Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!filters.category}
                                onChange={handleChange}
                                name="all"
                                sx={{
                                    color: orange[500],
                                    '&.Mui-checked': {
                                        color: orange[500],
                                    },
                                }}
                            />
                        }
                        label="All"
                    />
                    {categoryList?.map((checkbox) => (
                        <FormControlLabel
                            key={checkbox.name}
                            control={
                                <Checkbox
                                    checked={filters.category === checkbox.name}
                                    onChange={handleChange}
                                    name={checkbox.name}
                                    sx={{
                                        color: orange[500],
                                        '&.Mui-checked': {
                                            color: orange[500],
                                        },
                                    }}
                                />
                            }
                            label={checkbox.label}
                        />
                    ))}
                </FormGroup>
            </Box>
        </Box>
    )
}

export default ProductFilter
