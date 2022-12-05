import styled from "styled-components";// import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";

const LoginButton = () => {

    const { 
        state: { state },
        action: { setUser, createUser, setUserInfo, setProjects, createProject, setPersistedState },
    } = useContext(UserContext)

    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0()

    
    useEffect(() => {
        if(!isAuthenticated){
            
            setPersistedState(null)
        }

    },[])

    return (

                isAuthenticated === false
                ?
                <Button onClick={() => loginWithRedirect()}>
                    Sign In
                </Button>
                :
                <></>
    )
}

const Button = styled.button`

    border: none;
    background-color: lightBlue;
    width: 70px;
    height: 40px;
    border-radius: 5px;
    margin-right: 5px;
    margin-left: 5px;

    &&:hover{
        cursor: alias;
    }
    &&.right{
        position: absolute;
        left: 90vw;
        height: 50px;
    }

`


export default LoginButton;