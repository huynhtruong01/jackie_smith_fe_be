import {
    Box,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material'
import { orange } from '@mui/material/colors'
import { Controller } from 'react-hook-form'

RadioField.propTypes = {}

function RadioField({ name, form, label, data = [] }) {
    const { control, formState } = form
    const error = formState.errors[name]

    return (
        <Box m="16px 0">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <FormControl>
                        <FormLabel
                            id="radio-label"
                            sx={{
                                color: orange[500],
                                '&.Mui-focused': {
                                    color: orange[500],
                                },
                            }}
                        >
                            {label}
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="radio-label"
                            defaultValue={data[0].value}
                            value={value}
                            onChange={onChange}
                        >
                            {data?.map((x) => (
                                <FormControlLabel
                                    key={x.value}
                                    value={x.value}
                                    control={
                                        <Radio
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: orange[600],
                                                },
                                            }}
                                        />
                                    }
                                    label={x.label}
                                />
                            ))}
                        </RadioGroup>
                        <FormHelperText>{error?.message}</FormHelperText>
                    </FormControl>
                )}
            />
        </Box>
    )
}

export default RadioField
