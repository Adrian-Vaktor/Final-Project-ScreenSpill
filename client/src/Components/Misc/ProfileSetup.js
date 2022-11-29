import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";


const ProfileSetup = () => {
    const { user, isAuthenticated } = useAuth0()
    console.log(user)

    return (
        <>
            {
                <article className='column'>
                    {JSON.stringify(user)}
                </article>
            }
        </>
    )
}

export default ProfileSetup;