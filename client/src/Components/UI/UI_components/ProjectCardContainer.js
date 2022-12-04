import styled from "styled-components";
import { UserContext } from "../../Context/UserContext";
import { useContext, ueState, useEffect } from "react";
import LoaderElement from "../../Misc/LoaderElement";
import ProjectCard from "./ProjectCard";


const ProjectCardContainer = () => {

    const { 
        state: { state },
        action: { setUser, createUser, setUserInfo, setProjects, createProject },
    } = useContext(UserContext)



    useEffect(() => {
        
    },[state])

    return (
        <ProjectCardContainer_Wrapper>
        {
            (state.userProjects !== 'not-set')
            ?
            <>{
                state.userProjects.length === 0
                ?
                <NoProjects>
                    <h2>No projects yet</h2>
                </NoProjects>
                :
                state.userProjects.map((project) => {
                    return (
                        <ProjectCard 
                        key={Math.floor(Math.random()*1000000)}
                        project={project} />
                    )
                })
            }</>
            :
            <></>
        }
        </ProjectCardContainer_Wrapper>
    )
}

const NoProjects = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    h2{
        margin: 0;
        padding: 0;
        font-size: 200%;
        opacity: 10%;
        margin-bottom: 1vh;
    }


`

const ProjectCardContainer_Wrapper = styled.div`
    width: 90%;
    height: 400px;
    background-color: white;
    *{
        flex: 1 1 0px;
      }
`

export default ProjectCardContainer;