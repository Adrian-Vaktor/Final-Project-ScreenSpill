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
import SignInDIv from '../Misc/SignInDiv';
import LoaderElement from '../Misc/LoaderElement';

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
    
    const [ isSignInDivOpen, setIsSignInDivOpen ] = useState(false)
    const [ isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)

    useEffect(() => {

    },[state])


    useEffect(() => {
        
        if(user, isAuthenticated){
            console.log('setting');
            console.log(user);
            
            
            setUser(user)
            setIsNeedProjects(true)
            
        }
    },[user])

    if(isNeedProjects){
        
        if(typeof state.userInfo === 'object' && !isProjectsLoaded){

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
    }

    const handleToggleSignInDiv = () => {
        setIsSignInDivOpen(state => !state)
    }

    return (
        <ProjectManagerPage_Wrapper>
            <Header>
            {
                //Check if user is logging in for the first time (no profile settings)
                state.userInfo === 'not-set' 
                ?
                <div>
                </div>
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
                                isEditUserModalOpen
                                ?
                                <EditUser_Wrapper>
                                    <UserSetup isEdit={true} setIsEditUserModalOpen={setIsEditUserModalOpen}/>
                                    <ModalBackdrop setIsOpen={setIsEditUserModalOpen}/>
                                </EditUser_Wrapper>
                                :
                                <></>
                            }
                            {
                                isCreateNewProjectWindowOpen
                                ?
                                <>
                                <ProjectSetup 
                                    triggerReload={setTriggerReload}
                                    isCreateNewProjectWindowOpen={isCreateNewProjectWindowOpen}
                                    setIsCreateNewProjectWindowOpen={setIsCreateNewProjectWindowOpen}/>
                                <ModalBackdrop 
                                    setIsOpen={setIsCreateNewProjectWindowOpen}
                                    isBlack={true}/>
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
            <button onClick={handleToggleSignInDiv}>User</button>
            {
                isSignInDivOpen
                ?
                <SignInWrapper>

                    <SignInDIv setIsEditUserModalOpen={setIsEditUserModalOpen}/>
                    <ModalBackdrop isInvisible={true} setIsOpen={setIsSignInDivOpen}/>

                </SignInWrapper>
                :
                <></>
            }
            {/* <LogoutButton></LogoutButton> */}

            </Header>

            {
                state.userProjects === 'not-set'
                ?
                <>
                    {
                        state.userInfo === 'set-up'
                        ?
                        <></>
                        :
                        <LoaderElement />
                    }
                    {/* <ModalBackdrop /> */}
                </>
                :
                <ProjectCardContainer />

            }
        </ProjectManagerPage_Wrapper>
    )
}

const EditUser_Wrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 5;

`

const SignInWrapper = styled.div`
    position: absolute;

`

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

`

const ProjectManagerPage_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;


`


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
