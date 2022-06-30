import { Box, Button } from '@mui/material'
import FacebookLogin from 'react-facebook-login'
import FacebookIcon from '@mui/icons-material/Facebook'
import { indigo } from '@mui/material/colors'

LoginFacebook.propTypes = {}

function LoginFacebook(props) {
    const appId = '3248475478760815'

    const handleSuccess = (res) => {
        console.log(res)
    }

    return (
        <Box
            flex={1}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: indigo[800],
                border: 'none',
                height: '44px',
                borderRadius: '2px',
                width: '100%',
                color: '#fff',
                p: '10px',
                cursor: 'pointer',

                svg: {
                    mr: '20px',
                },

                '.btn-facebook': {
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#fff',
                },
            }}
        >
            <FacebookIcon />
            <FacebookLogin
                appId={appId}
                autoLoad={false}
                textButton="Sign in with facebook"
                callback={handleSuccess}
                field="name,email,picture"
                scope="public_profile,user_friends"
                cssClass="btn-facebook"
            />
        </Box>
    )
}

export default LoginFacebook
