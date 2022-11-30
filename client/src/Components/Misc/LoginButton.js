// import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";


const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0()
    console.log(isAuthenticated);
    
    if (isLoading) {
        console.log("loading");
    }
    else if (!isAuthenticated) {
        console.log("authenticated: ", isAuthenticated);
    }

    return (

                isAuthenticated === false
                ?
                <button onClick={() => loginWithRedirect()}>
                    Sign In
                </button>
                :
                <></>
    )
}

export default LoginButton;