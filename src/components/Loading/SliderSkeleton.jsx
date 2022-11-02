import { Box, Skeleton } from '@mui/material'
import { grey } from '@mui/material/colors'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

SliderSkeleton.propTypes = {}

function SliderItemSkeleton({ quantity }) {
    return (
        <Box
            sx={{
                display: 'flex',

                width: `calc(100%/${quantity} - 12px)`,
                p: '12px',
                borderRadius: '8px',
                gap: '16px',
                backgroundColor: grey[100],
            }}
        >
            <Box
                sx={{
                    width: '150px',
                }}
            >
                <Skeleton
                    variant="rounded"
                    width={150}
                    height="100%"
                    sx={{
                        borderRadius: '8px',
                    }}
                />
            </Box>
            <Box
                sx={{
                    flex: '1 1 0',
                }}
            >
                <Box
                    sx={{
                        mb: '4px',
                    }}
                >
                    <Skeleton
                        variant="text"
                        width="100%"
                        sx={{
                            fontSize: '1rem',
                        }}
                    />
                    <Skeleton
                        variant="text"
                        width="40%"
                        sx={{
                            fontSize: '1rem',
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        mb: '8px',
                    }}
                >
                    <Skeleton
                        variant="text"
                        width="90%"
                        sx={{
                            fontSize: '.8rem',
                        }}
                    />
                    <Skeleton
                        variant="text"
                        width="50%"
                        sx={{
                            fontSize: '.8rem',
                            mb: '12px',
                        }}
                    />
                </Box>
                <Skeleton
                    variant="rounded"
                    width={78}
                    height={34}
                    sx={{
                        borderRadius: '3px',
                    }}
                />
            </Box>
        </Box>
    )
}

function SliderSkeleton({ quantity = 3 }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
            }}
        >
            {Array.from(new Array(quantity)).map((item, index) => (
                <Fragment key={index}>
                    <SliderItemSkeleton quantity={quantity} />
                </Fragment>
            ))}
        </Box>
    )
}

export default SliderSkeleton
