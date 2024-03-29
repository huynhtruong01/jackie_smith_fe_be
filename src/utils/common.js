import categoriesApi from '../api/categoriesApi'

// slider image
export const sliders = [
    'https://cdn.shopify.com/s/files/1/0208/1956/files/E_0277_IM_Web-D1_1944x.jpg?v=1653407470',
    'https://cdn.shopify.com/s/files/1/0208/1956/files/E_0279_IM_WebSneakers-D1_1296x.jpg?v=1653053769',
    'https://cdn.shopify.com/s/files/1/0208/1956/files/E_275_IM_Web-D1_1296x.jpg?v=1652457050',
]

const imgCategoryList = [
    'https://cdn.shopify.com/s/files/1/0208/1956/products/CP01983MJA01Z99_BAJA_A_360x.jpg?v=1651667301',
    'https://cdn.shopify.com/s/files/1/0208/1956/products/CPV1990RMD021TU_baja_a_360x.jpg?v=1629212354',
    'https://cdn.shopify.com/s/files/1/0208/1956/products/SWL1966LNA04F_BAJA_A_360x.jpg?v=1654614468',
    'https://cdn.shopify.com/s/files/1/0208/1956/products/0020526LOA05N_Baja_a_360x.jpg?v=1626099521',
]

export const categoryList = async () => {
    try {
        const { categories } = await categoriesApi.getAll()
        const newCategoryList = categories.map((x, index) => ({
            id: x._id,
            name: x.name,
            image: imgCategoryList[index],
        }))

        return newCategoryList
    } catch (error) {
        console.log('Error: ', error)
    }
}

export const truncate = (str, number) => {
    if (!str) return ''
    return `${str?.slice(0, number)}\u2026`
}

export const formatPrice = (x) => {
    if (!x) return 0
    return `$${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

export const formatCapitalize = (str) => {
    if (!str) return ''
    return str
        ?.split(' ')
        ?.filter((x) => !!x)
        ?.map((x) => `${x[0].toUpperCase()}${x.slice(1).toLowerCase()}`)
        ?.join(' ')
        ?.trim()
}

export const formatString = (str) => {
    if (!str) return ''
    return str
        ?.split(' ')
        ?.filter((x) => !!x && x.length >= 2)
        ?.join(' ')
}

export const getNameUser = (str) => {
    if (!str) return ''
    return str
        ?.split(' ')
        ?.filter((x) => !!x && x.length >= 2)
        ?.slice(-1)
}

export const generateDate = () => {
    const fullDate = new Date()
    const date = `0${fullDate.getDate()}`.slice(-2)
    const month = `0${fullDate.getMonth() + 1}`.slice(-2)
    const year = fullDate.getFullYear()

    return `${date}/${month}/${year}`
}
