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

                                <BackdropWrap>
                                    <EditUser_Wrapper>
                                        <UserSetup isEdit={true} setIsEditUserModalOpen={setIsEditUserModalOpen}/>
                                        <ModalBackdrop setIsOpen={setIsEditUserModalOpen}/>
                                    </EditUser_Wrapper>
                                </BackdropWrap>
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
                                <BackdropWrap>
                                <ModalBackdrop 
                                    setIsOpen={setIsCreateNewProjectWindowOpen}/>
                                
                                </BackdropWrap>
                                </>
                                :
                                <></>
                            }

                            {state.userInfo.name}
                            <Button onClick={handleCreateProject}>
                                    create project
                            </Button>
                            <h3>Projects</h3>

                        </>
                    }
                </>
            }
            <Button onClick={handleToggleSignInDiv}>User</Button>
            {
                isSignInDivOpen
                ?
                <BackdropWrap>
                    <SignInWrapper>

                        <SignInDIv setIsEditUserModalOpen={setIsEditUserModalOpen}/>
                        <ModalBackdrop isInvisible={true} setIsOpen={setIsSignInDivOpen}/>

                    </SignInWrapper>
                </BackdropWrap>
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
                        <BackdropWrap>
                            <LoaderElement />
                        </BackdropWrap>
                    }
                    {/* <ModalBackdrop /> */}
                </>
                :
                <ProjectCardContainer />

            }
        </ProjectManagerPage_Wrapper>
    )
}



const Button = styled.button`
border: none;
background-color: lightBlue;
width: 60px;
height: 70%;
border-radius: 5px;
margin-right: 5px;
margin-left: 5px;

&&:hover{
    cursor: alias;
}

`
const BackdropWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`


const SignInWrapper = styled.div`
    position: absolute;
    top:40px;
    left:0;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 10px;


`

const EditUser_Wrapper = styled.div`
    position: absolute;
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 10px;


`


const Header = styled.div`
    width: 100%;
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-around;
    background-color: #e6f0ef;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 10px;
    padding: 0 200px;
    overflow: hidden;
    z-index: 100;

    h3{
        position: relative;
        top: 10px;
        left: -40px;
        color: #c5d4cb;
        font-size: 100px;

        @keyframes example {
            0%   {top: 100px; }
            15%  {transform: rotate(-7deg);}
            25%  {}
            50% {top: 8px;}
            75% {top: 9px; transform: rotate(0deg)}
            100% {top: 10px;}

          }

            animation-name: example;
            animation-iteration-count: 1;
            animation-duration: 3s;
    }


`

const ProjectManagerPage_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;


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
