import styled from 'styled-components'

import { useEffect, useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';
import { Loader } from 'react-feather';
import ScriptWriter from './Functional_Components/ScriptWriter';
import Organizer from './Functional_Components/Organizer';
import Calendar from './Functional_Components/Calendar';
import Contacts from './Functional_Components/Contacts';
import Map from './Functional_Components/Map';
import Characters from './Functional_Components/Characters';
import SignInDIv from '../Misc/SignInDiv';
import ModalBackdrop from '../Misc/ModalBackdrop';


const Project_HomePage = () => {

    const { 
        state: { state },
        action: { setUser, createUser, setUserInfo, setProjects, createProject, setPersistedState },
    } = useContext(UserContext)

    const { projectId } = useParams()

    const [ currentProject, setCurrentProject ] = useState(undefined)
    const [ currentFunctionPage, setCurrentFunctionPage ] = useState('script')
    const [ projectWork, setProjectWork ] = useState(undefined)    
    const [ currentPersistedStateFlag, setCurrentPersistedStateFlag ] = useState(false)

    const [ isSignInDivOpen, setIsSignInDivOpen ] = useState(false)
    const [ isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)

    const navigate = useNavigate()

    useEffect(()=> {
        if(projectWork === undefined && currentProject!== undefined){
            setProjectWork(currentProject)
        }

    },[currentProject])
    
    useEffect(() => {
        let persistentState = JSON.parse(localStorage.getItem("ScreenSpill-UserState"))
        setPersistedState(persistentState)
        const currentProjectFind = persistentState.userProjects.find(element => element.projectId === projectId);
        setCurrentProject(currentProjectFind)
        setCurrentPersistedStateFlag(true)

    },[projectId])


    const handleChooseFunction = (functionPage) => {
        setCurrentFunctionPage(functionPage)
    }


    const saveWork = (work) => {
        if(work !== undefined){
            setCurrentProject(work)
            fetch(`/api/updateProject/${projectId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(work)
            })
            .then(res => res.json())
            .then(resData => {
                console.log('hot sauce');
                
                setProjects()
            })
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            saveWork(projectWork)
            clearInterval(interval)
        }, 1500);
        return () => clearInterval(interval);
      }, [projectWork]);

      const handleToggleSignInDiv = () => {
        setIsSignInDivOpen(state => !state)
    }

    

    return (
        <>
        {
            projectWork
            
            ?
            <ProjectHomePage_Wrapper>
                <UIHeader>
                    <Button onClick={()=> {navigate('/ux/project-manager')}} >Home</Button>
                    <Button onClick={() => {saveWork(projectWork)}} >Save</Button>
                    <h3>{projectWork.title}</h3>
                    <Button className='right' onClick={handleToggleSignInDiv}>User</Button>
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
                </UIHeader>
                <BodyContainer>
                    <UISideBar>
                        <FunctionButton onClick={()=> {handleChooseFunction('script')}}>Script</FunctionButton>
                        <FunctionButton onClick={()=> {handleChooseFunction('characters')}}>Characters</FunctionButton>
                        <FunctionButton onClick={()=> {handleChooseFunction('map')}}>Map</FunctionButton>
                        <FunctionButton onClick={()=> {handleChooseFunction('organizer')}}>Organizer</FunctionButton>
                        <Rest>
                        <FunctionButton className="add">+</FunctionButton>
                        </Rest>

                        {/* <FunctionButton onClick={()=> {handleChooseFunction('contacts')}}>Contacts</FunctionButton> */}
                    </UISideBar>
                    
                        {
                            currentFunctionPage === 'script'
                            ?
                            <ScriptWriter projectWork={projectWork} setProjectWork={setProjectWork}></ScriptWriter>
                            :
                            <></>
                        }
                        {
                            currentFunctionPage === 'organizer'
                            ?
                            <Organizer projectWork={projectWork} setProjectWork={setProjectWork}></Organizer>
                            :
                            <></>
                        }
                        {
                            currentFunctionPage === 'map'
                            ?
                            <Map projectWork={projectWork} setProjectWork={setProjectWork}></Map>
                            :
                            <></>
                        }
                        {
                            currentFunctionPage === 'contacts'
                            ?
                            <Contacts></Contacts>
                            :
                            <></>
                        }
                        {
                            currentFunctionPage === 'calendar'
                            ?
                            <Calendar></Calendar>
                            :
                            <></>
                        }
                        {
                            currentFunctionPage === 'characters'
                            ?
                            <Characters projectWork={projectWork} setProjectWork={setProjectWork}></Characters>
                            :
                            <></>
                        }
 
                </BodyContainer>

            </ProjectHomePage_Wrapper>
            :
            <ProjectHomePage_Wrapper>
                <Loader />
            </ProjectHomePage_Wrapper>
        }
        </>
    )
}


const BackdropWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`


const SignInWrapper = styled.div`
    position: absolute;
    top: 40px;
    left:0;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 10px;


`

const Rest = styled.div`

    height: 95%;
    width: 100%;
    margin-top: 5%;
    background-color: #badfe0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start
`

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
    &&.right{
        position: absolute;
        left: 90vw;
        height: 50px;
    }

`

const ProjectHomePage_Wrapper = styled.div`
 width: 100%;
 height: 100%;
`

const BodyContainer = styled.div`
    // width: 100%;
    // height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`

const FunctionButton = styled.button`
    border: none;
    width: 50px;
    min-height: 50px;
    heightL 50px;
    background-color: lightBlue;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 50%;

    &.add{ 
        width: 40px;
        min-height: 40px;
        height: 40px;
        margin-top: 20%;
        background-color: white;
    }
`

const UISideBar = styled.div`
    width: 70px;
    height: calc(100vh - 60px);
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 10px;
    z-index: 9;

`

const UIHeader = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 4px 10px;
    z-index: 100;
    overflow: hidden;
    

    h3{
        position: relative;
        top: 3px;
        left: 150px;
        color: #c5d4cb;
        font-size: 80px;
        opacity: 60%;
        transform: rotate(-1deg);
        overflow-wrap: normal;

        @keyframes example {
            0%   {top: 100px; rotate(-7deg)}
            15%  {transform: rotate(-7deg);}
            25%  {}
            50% {top: 1px;}
            75% {top: 2px; transform: rotate(-1deg)}
            100% {top: 3px;transform: rotate(-1deg)}

          }

            animation-name: example;
            animation-iteration-count: 1;
            animation-duration: 2s;
    }

`



export default Project_HomePage;