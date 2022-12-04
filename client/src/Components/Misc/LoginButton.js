// import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";

const LoginButton = () => {

    const { 
        state: { state },
        action: { setUser, createUser, setUserInfo, setProjects, createProject, setPersistedState },
    } = useContext(UserContext)

    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0()


    if (isLoading) {
        // console.log("loading");
    }
    else if (!isAuthenticated) {

        // console.log("authenticated: ", isAuthenticated);
    }
    
    useEffect(() => {
        if(!isAuthenticated){
            
            setPersistedState(null)
        }

    },[])

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