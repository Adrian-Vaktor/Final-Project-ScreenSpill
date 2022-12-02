import styled from 'styled-components'

import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../Misc/LogoutButton';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

import UserSetup from '../Misc/UserSetup'
import ModalBackdrop from '../Misc/ModalBackdrop'
import ProjectSetup from '../Misc/ProjectSetup';
import ProjectCardContainer from './UI_components/ProjectCardContainer';

const ProjectManager_Page = () => {

    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuth0()
    const { 
        state: { state },
        action: { setUser, createUser, setUserInfo, setProjects, createProject },
    } = useContext(UserContext)

    const [ isNeedProjects, setIsNeedProjects ] = useState(false)
    const [ isCreateNewProjectWindowOpen, setIsCreateNewProjectWindowOpen ] = useState(false)
    const [ isProjectsLoaded, setIsProjectsLoaded ] = useState(false)
    const [ triggerReload, setTriggerReload ] = useState(false)

    useEffect(() => {
        
        if(user, isAuthenticated){
            setUser(user)
            setIsNeedProjects(true)
            
            // fetch('/api/hey').then(data => data.json).then(res => console.log(res))
        }
    },[user])

    if(isNeedProjects){
        
        if(typeof state.userInfo === 'object' && !isProjectsLoaded){
            console.log(state);

            setIsNeedProjects(false)
            setIsProjectsLoaded(true)
            setProjects()
        }
    }
    
    const handleCreateProject = () => {
        setIsCreateNewProjectWindowOpen(true)
    }

    const handleGetProjects = () => {
        // fetch(`/api/getProjects/${state.userLoginInfo.sub}`).then(
        //     data => data.json()
        // ).then(res => console.log())
        console.log(state);
        
    }



    return (
        <>
        {
            //Check if user is logging in for the first time (no profile settings)
            state.userInfo === 'not-set' ?
            <>
                no-data
            </>
            :
            <>
                {
                    //If the 'set-up' flag in the state then bring up the setup component
                    state.userInfo === 'set-up' ?
                    <>
                        <UserSetup />
                        <ModalBackdrop />
                    </>
                    :
                    <>
                        {
                            isCreateNewProjectWindowOpen
                            ?
                            <>
                            <ProjectSetup 
                                triggerReload={setTriggerReload}
                                isCreateNewProjectWindowOpen={isCreateNewProjectWindowOpen}
                                setIsCreateNewProjectWindowOpen={setIsCreateNewProjectWindowOpen}/>
                            <ModalBackdrop 
                                isOpen={isCreateNewProjectWindowOpen}
                                setIsOpen={setIsCreateNewProjectWindowOpen}/>
                            </>
                            :
                            <></>
                        }

                        {state.userInfo.name}
                        <button onClick={handleCreateProject}>
                                create project
                        </button>

                        <button onClick={handleGetProjects}>
                                get projects
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
            <ProjectCardContainer />
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
