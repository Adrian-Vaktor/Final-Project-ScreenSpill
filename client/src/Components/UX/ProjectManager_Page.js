import styled from 'styled-components'
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../Misc/LogoutButton';


const ProjectManager_Page = () => {
    const { user, isAuthenticated } = useAuth0()


    return (
        <>
        <LogoutButton></LogoutButton>
            {
                <article className='column'>
                    {/* {JSON.stringify(user)} */}
                    {user?.name}
                </article>
            }
        </>
    )
}


export default ProjectManager_Page;