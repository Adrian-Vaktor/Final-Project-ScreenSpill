import styled from 'styled-components'
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../Misc/LogoutButton';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const ProjectManager_Page = () => {

    const { 
        state: { state },
        action: { setUser, createUser, setUserInfo, setProjects, createProject },
    } = useContext(UserContext)

    const { user, isAuthenticated } = useAuth0()
    const navigate = useNavigate()


    useEffect(()=> {
        console.log(state);
    }, [state])
    


    useEffect(() => {
        
        if(user, isAuthenticated){
            setUser(user)
            setProjects()
            // fetch('/api/hey').then(data => data.json).then(res => console.log(res))
        }
    },[user])

    const handleCreateUser = () => {
        const tempUser = {
            name: 'Adrian',
            style: 'Black Metal',
            loginId: state.userLoginInfo.sub,
            projects: [],
        }
        createUser(tempUser)
    }

    const handleCreateProject = () => {
        const tempProj = {
            name: 'the sparticus advneture',
            genre: 'stupid'
        }
        createProject(tempProj)
    }

    
    
    return (
        <>
        {
            state.userInfo === 'not-set' ?
            <>
                no-data
            </>
            :
            <>
                {
                    state.userInfo === 'set-up' ?
                    <>
                        set up window
                        <button onClick={handleCreateUser}>
                            create user
                        </button>

                    </>
                    :
                    <>
                    {state.userInfo.name}
                    <button onClick={handleCreateProject}>
                            create project
                        </button>
                    </>
                }
            </>
        }
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


// {
//     "given_name": "Adrian",
//     "family_name": "Vaktor",
//     "nickname": "info",
//     "name": "Adrian Vaktor",
//     "picture": "https://lh3.googleusercontent.com/a/ALm5wu16tnTBoLypEfljhArP2ZN07YHbLG0jt_KL984g=s96-c",
//     "locale": "en",
//     "updated_at": "2022-11-28T15:57:36.371Z",
//     "email": "info@adrianvaktor.com",
//     "email_verified": true,
//     "sub": "google-oauth2|113790482587296576853"
// }