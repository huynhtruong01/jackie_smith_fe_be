import { TableCell } from '@mui/material'
import { formatCapitalize, truncate } from '../../utils/common'
import { colorMode } from '../../utils/trackingOrder'
import ButtonClick from '../ButtonClick'
import OptionDetail from '../OptionDetail'

TableDataBody.propTypes = {}

function TableDataBody({ data = {} }) {
    const { type, ...newData } = data

    return (
        <>
            {Object.values({ ...newData, id: truncate(data.id, 5) }).map((x, index) => {
                const checkMode = colorMode(x) ? colorMode(x) : false

                return (
                    <TableCell align="center" key={`${x}${index}`}>
                        {checkMode ? (
                            <ButtonClick
                                bgColor={checkMode.bgColor}
                                textColor={checkMode.textColor}
                                text={formatCapitalize(x)}
                            />
                        ) : (
                            x
                        )}
                    </TableCell>
                )
            })}
            <TableCell>{type === 'tracking order' && <OptionDetail data={data} />}</TableCell>
        </>
    )
}

export default TableDataBody
