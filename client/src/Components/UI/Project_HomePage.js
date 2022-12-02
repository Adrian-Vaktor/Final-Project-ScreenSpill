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




const Project_HomePage = () => {

    const { 
        state: { state },
        action: { setUser, createUser, setUserInfo, setProjects, createProject, setPersistedState },
    } = useContext(UserContext)

    const { projectId } = useParams()
    const [ currentProject, setCurrentProject ] = useState(undefined)

    const [ currentFunctionPage, setCurrentFunctionPage ] = useState('script')
    


    const navigate = useNavigate()
    //For managing a persistant state on the page 
    //- so you can reload and not lose the project from the UserContext -> without fetch

    const [ currentPersistedStateFlag, setCurrentPersistedStateFlag ] = useState(false)
    useEffect(() => {
        let persistentState = JSON.parse(localStorage.getItem("ScreenSpill-UserState"))
        console.log('heya',persistentState)
        setPersistedState(persistentState)

        const currentProjectFind = persistentState.userProjects.find(element => element.projectId === projectId);
        setCurrentProject(currentProjectFind)
        setCurrentPersistedStateFlag(true)
    },[projectId])

    useEffect(()=> {
        if(currentPersistedStateFlag){
            window.addEventListener('keypress', (e) => {
                if(e.key === 'p'){
                    console.log("this",state)
                }
            })
            return () => {
                window.removeEventListener('keypress', (e) => {
                    if(e.key === 'p'){
                        console.log("this",state)
                    }
                })
            }
        }
    },[currentPersistedStateFlag])

    const handleChooseFunction = (functionPage) => {
        console.log(functionPage);
        
        setCurrentFunctionPage(functionPage)
    }


    return (
        <>
        {
            currentProject
            ?
            <ProjectHomePage_Wrapper>
                <UIHeader>Header</UIHeader>
                <BodyContainer>
                    <UISideBar>
                        <FunctionButton onClick={()=> {handleChooseFunction('script')}}>Script</FunctionButton>
                        <FunctionButton onClick={()=> {handleChooseFunction('organizer')}}>Organizer</FunctionButton>
                        <FunctionButton onClick={()=> {handleChooseFunction('map')}}>Map</FunctionButton>
                        <FunctionButton onClick={()=> {handleChooseFunction('contacts')}}>Contacts</FunctionButton>
                    </UISideBar>
                    
                    {/* <FunctionsContainer> */}
                        {
                            currentFunctionPage === 'script'
                            ?
                            <ScriptWriter></ScriptWriter>
                            :
                            <></>
                        }
                        {
                            currentFunctionPage === 'organizer'
                            ?
                            <Organizer></Organizer>
                            :
                            <></>
                        }
                        {
                            currentFunctionPage === 'map'
                            ?
                            <Map></Map>
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
                    {/* </FunctionsContainer> */}
                    {/* <TEST></TEST> */}
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

const TEST = styled.div`
    // width: 100vw;
    // height: 100vh;
    // flex-grow:1;


    background-color: white;
`
const FunctionsContainer = styled.div`
    // height: 100%;
    // width: 100%;
    // flex-grow:1;

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
    width: 92%;
    height: 60px;
    background-color: lightBlue;
    margin-bottom: 5px;
`

const UISideBar = styled.div`
    width: 70px;
    height: calc(100vh - 60px);
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const UIHeader = styled.div`
    width: 100%;
    height: 60px;
    background-color: white;
`



export default Project_HomePage;