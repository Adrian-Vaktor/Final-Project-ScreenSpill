import styled from 'styled-components'

import LoginButton from '../Misc/LoginButton'
import LogoutButton from '../Misc/LogoutButton'


//connection to AUTH0


const SignIn_Page = () => {

    return (
        <SignInWrapper>
            <LoginButton />
            <LogoutButton />
        </SignInWrapper>
    )
}

const SignInWrapper = styled.div`



`

export default SignIn_Page;