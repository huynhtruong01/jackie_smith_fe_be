import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { grey, orange } from '@mui/material/colors'
import { formatColor } from '../../../../utils/color'
import { formatCapitalize } from '../../../../utils/common'
import CategoryListSkeleton from '../Skeleton/CategoryListSkeleton'

ProductFilterArr.propTypes = {}

function ProductFilterArr({
    filters,
    title,
    data = [],
    onChange = null,
    isColor = false,
    loading = false,
}) {
    const handleCheckboxChange = (e) => {
        if (!onChange) return

        console.log(e.target.name)

        if (e.target.name === 'all') {
            onChange('')
            return
        }

        onChange(e.target.name)
    }

    return (
        <Box>
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
                                name="all"
                                checked={!filters[title.toLowerCase()]}
                                onChange={handleCheckboxChange}
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
                    {data?.map((x) => (
                        <FormControlLabel
                            key={x._id}
                            control={
                                <Checkbox
                                    name={x?._id}
                                    checked={filters[title.toLowerCase()] === x?._id}
                                    onChange={handleCheckboxChange}
                                    sx={{
                                        color: orange[500],
                                        '&.Mui-checked': {
                                            color: orange[500],
                                        },
                                    }}
                                />
                            }
                            label={
                                isColor ? (
                                    <Box
                                        backgroundColor={
                                            formatColor(x?.name)[0] === '#' && formatColor(x?.name)
                                        }
                                        border={`1px solid ${grey[500]}`}
                                        borderRadius="2px"
                                        width="20px"
                                        height="20px"
                                    ></Box>
                                ) : (
                                    formatCapitalize(x?.name)
                                )
                            }
                        />
                    ))}
                    {loading && <CategoryListSkeleton limit={10} />}
                </FormGroup>
            </Box>
        </Box>
    )
}

export default ProductFilterArr
