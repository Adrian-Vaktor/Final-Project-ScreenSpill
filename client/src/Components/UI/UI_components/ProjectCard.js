import styled from "styled-components";
import { UserContext } from "../../Context/UserContext";
import { useContext, ueState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const ProjectCard = ({project}) => {
    const navigate = useNavigate()

    const handleEditButton = () => {

        navigate(`/ux/project/${project.projectId}`)

    }

    return (
        <Card_Wrapper>
            <Content>
                <Card_Div>
                    <div>{project.title}</div>
                    <div>{project.authors}</div>
                    <Button onClick={handleEditButton}>Edit</Button>
                    <Button>Delete</Button>

                </Card_Div>

            </Content>
        </Card_Wrapper>
    )
}

const Card_Div = styled.div`
    padding: 0 10px;
    min-width: 400px;
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Button = styled.button`
    width: 130px;
    height: 40px;
    border-radius: 3px;
    border: none;
    background-color: white;
`

const Content = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 25px;

`

const Card_Wrapper = styled.div`
    width: 100%;
    height: 100px;
    background-color: lightblue;
    margin-bottom: 5px;
`

export default ProjectCard;