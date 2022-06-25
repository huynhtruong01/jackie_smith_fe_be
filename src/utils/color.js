export const formatColor = (colorName) => {
    if (!colorName) return

    let color = '#fff'

    switch (colorName) {
        case 'green':
            color = '#44bd32'
            break
        case 'black':
            color = '#000'
            break
        case 'pink':
            color = '#e84393'
            break
        case 'red':
            color = '#e74c3c'
            break
        case 'orange':
            color = '#e67e22'
            break
        case 'yellow brown':
            color = '#d35400'
            break
        case 'yellow':
            color = '#f1c40f'
            break
        case 'violet':
            color = '#8e44ad'
            break
        case 'dark blue':
            color = '#34495e'
            break
        case 'blue':
            color = '#3498db'
            break
    }

    return color
}
