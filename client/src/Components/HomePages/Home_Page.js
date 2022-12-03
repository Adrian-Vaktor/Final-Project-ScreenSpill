import styled from 'styled-components'

import LoginButton from '../Misc/LoginButton'
import LogoutButton from '../Misc/LogoutButton'


const Home_Page = () => {

    // fetch('/api/hello').then(res => res.json()).then(data => console.log(data));

    return (
        <>
        Home_Page
            <SignInWrapper>
                <LoginButton />
                <LogoutButton />
            </SignInWrapper>
        </>
    )
}



const SignInWrapper = styled.div`

`



export default Home_Page;