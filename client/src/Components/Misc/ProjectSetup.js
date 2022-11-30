import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useContext } from "react";
import { UserContext } from '../Context/UserContext';


const ProjectSetup = ({ isCreateNewProjectWindowOpen, setIsCreateNewProjectWindowOpen}) => {
    const { user, isAuthenticated } = useAuth0()
    
    const getDate = () => {

        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        return today
    }

    const { 
        state: { state },
        action: { setUser, createUser, setUserInfo, setProjects, createProject },
    } = useContext(UserContext)
    
    const initInputState = {
        title: '',
        authors: `${state.userInfo.firstName} ${state.userInfo.lastName}`,
        date: getDate(),
        copyright: ''


    }
    const [ inputStates, setInputStates ] = useState(initInputState)

    const handleCreateButton = () => {
        createProject(inputStates)
    }

    const handleInputChange = (e, field) => {
        if(Object.keys(inputStates).includes(field)){
            const tempObj = { ...inputStates}
            tempObj[field] = e.target.value
            setInputStates(tempObj)
            console.log(e.target.value);
            
        }

    }    
    

    return (
        <ProjectSetup_Wrapper>
            <Content>
                <Title> Create a New Project </Title>
                <Line />
                <Form>
                    <Form_Div>
                        <p>Title</p>
                        <Input onChange={(e)=> {handleInputChange(e, 'title' )}} value={inputStates.title} placeholder="Title"></Input>
                        <p>Authors</p>
                        <Input onChange={(e)=> {handleInputChange(e, 'authors' )}} value={inputStates.authors} placeholder="Authors"></Input>
                        <p>Date</p>
                        <Input onChange={(e)=> {handleInputChange(e, 'date' )}} value={inputStates.date} placeholder="Date"></Input>
                        <p>Copyright</p>
                        <Input onChange={(e)=> {handleInputChange(e, 'copyright' )}} value={inputStates.copyright} placeholder="Copyright"></Input>
                        <button onClick={handleCreateButton} >Create</button>
                    </Form_Div>
                </Form>
            </Content>
        </ProjectSetup_Wrapper>
    )
}

const Line = styled.div`
    height: 1px;
    width: 90%;
    background-color: lightgrey;
    // margin-bottom: 40%
`

const Title = styled.h2`
    margin-bottom: 5%;
    margin-top: 5%;

`


const Form_Div = styled.div`
    display: flex;
    flex-direction: column; 
    margin-left: 10px;
    
    *{
        margin: 0;
        margin-bottom: 10px;

    }

`

const Input = styled.input`

`

const Form = styled.div`
    // padding-top: 100px;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

`

const Content = styled.div`
    width: 100%;
    height: 100%;
    // min-height: 700px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    // padding: 30px;
    border-radius: 10px;
`

const ProjectSetup_Wrapper = styled.div`
    width: 90%;
    max-width: 700px;
    height: 80%;
    // min-height: 700px;

    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    border-radius: 10px;
    overflow-y: scroll;

`
export default ProjectSetup;