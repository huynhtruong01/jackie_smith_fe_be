import { Box, TableCell } from '@mui/material'
import { formatCapitalize } from '../../utils/common'
import { colorMode } from '../../utils/trackingOrder'
import BoxColor from '../BoxColor'
import ButtonClick from '../ButtonClick'
import OptionDetail from '../OptionDetail'

TableDataBody.propTypes = {}

function TableDataBody({ data = {} }) {
    const { type, ...newData } = data

    return (
        <>
            {Object.values({ ...newData }).map((x, index) => {
                const checkMode = colorMode(x) ? colorMode(x) : false
                console.log(x)

                return (
                    <TableCell align="center" key={`${x}${index}`}>
                        {checkMode && (
                            <ButtonClick
                                bgColor={checkMode.bgColor}
                                textColor={checkMode.textColor}
                                text={formatCapitalize(x)}
                            />
                        )}
                        {!checkMode && x[0] !== '#' && !x?.toString()?.startsWith('http') && x}
                        {x[0] === '#' && <BoxColor color={x} />}
                        {x?.toString()?.startsWith('http') && (
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Box width="70px">
                                    <img src={x} alt="" />
                                </Box>
                            </Box>
                        )}
                    </TableCell>
                )
            })}
            <TableCell>{type === 'tracking order' && <OptionDetail data={data} />}</TableCell>
        </>
    )
}

export default TableDataBody
