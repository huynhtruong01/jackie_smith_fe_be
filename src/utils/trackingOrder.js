import { green, red } from '@mui/material/colors'

export const colorMode = (mode) => {
    if (!mode) return

    const modeList = ['approves', 'approved']
    if (!modeList.includes(mode)) return false

    let bgColor = '#fff'
    let textColor = '#000'
    switch (mode) {
        case 'approves': {
            bgColor = red[50]
            textColor = red[500]
            break
        }

        case 'shipping': {
            bgColor = green[50]
            textColor = green[500]
            break
        }
    }

    return {
        bgColor,
        textColor,
    }
}
