import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import ButtonOrange from '../../../components/ButtonOrange'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { yupResolver } from '@hookform/resolvers/yup'
import QuantityField from '../../../components/formControls/QuantityField'
import SelectSizeField from '../../../components/formControls/SelectSizeField'
import { sneakerSizeList } from '../../../utils/size'

QuantityForm.propTypes = {}

function QuantityForm({ quantity = 1, onSubmit = null, menuList = [] }) {
    const schema = yup.object().shape({
        quantity: yup
            .number()
            .required('Please enter quantity')
            .typeError('Quantity must be number'),
        size: yup.string().required('Please select size'),
    })

    const form = useForm({
        defaultValues: {
            quantity,
            size: menuList.length > 0 ? '' : 'default',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (value) => {
        try {
            if (!onSubmit) return
            await onSubmit(value)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <Box component="form" onSubmit={form.handleSubmit(handleSubmit)} width="100%">
            <Box display="flex" mb="20px">
                <Box mr="20px">
                    <QuantityField name="quantity" form={form} />
                </Box>
                {menuList.length > 0 && (
                    <Box width="200px">
                        <SelectSizeField name="size" label="Size" form={form} menuList={menuList} />
                    </Box>
                )}
            </Box>
            <ButtonOrange icon={ShoppingCartIcon} text="Add to cart" type="submit" />
        </Box>
    )
}

export default QuantityForm
