// import styled from "styled-components";
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
                <button onClick={() => {
                    logout()
                    setPersistedState(null)
                    }}>
                    Sing Out
                </button>
                :
                <></>
            }
        </>
    )
}

export default LogoutButton;