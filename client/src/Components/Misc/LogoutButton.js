import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";


const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0()

    return (
        <>
            {
                isAuthenticated === true
                ?
                <button onClick={() => logout()}>
                    Sing Out
                </button>
                :
                <></>
            }
        </>
    )
}

export default LogoutButton;