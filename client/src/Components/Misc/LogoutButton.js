import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../Context/UserContext";
import { useContext, ueState, useEffect } from "react";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0()
    
    const { 
        state: { state },
        action: { setUser, createUser, setUserInfo, setProjects, createProject, setPersistedState},
    } = useContext(UserContext)


    

    return (
        <>
            {
                isAuthenticated === true
                ?
                <Button onClick={() => {
                    logout()
                    // setPersistedState(null)
                    }}>
                    Sing Out
                </Button>
                :
                <></>
            }
        </>
    )
}

const Button = styled.button`
    border: none;
    background-color: lightBlue;
    width: 90px;
    height: 30px;
    border-radius: 5px;
    margin-right: 5px;
    margin-left: 5px;
    margin-top: 10px;

    &&:hover{
        cursor: alias;
    }

`

export default LogoutButton;