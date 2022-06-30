import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { formatCapitalize } from '../../../../utils/common'
import CategoryListSkeleton from '../Skeleton/CategoryListSkeleton'

ProductFilter.propTypes = {}

function ProductFilter({ filters, title = '', api, onChange = null }) {
    const [categoryList, setCategoryList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
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

            setLoading(false)
        }

        getCategories()
    }, [])

    const handleChange = async (e) => {
        try {
            if (!onChange) return
            if (e.target.name === 'all') {
                onChange('')
                return
            }

            await onChange(e.target.name)
        } catch (error) {
            console.log(error)
        }
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
                    {loading && <CategoryListSkeleton limit={4} />}
                </FormGroup>
            </Box>
        </Box>
    )
}

export default ProductFilter
