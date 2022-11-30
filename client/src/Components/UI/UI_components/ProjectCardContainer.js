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
    return (
        <ProjectCardContainer_Wrapper>
        {
            (state.userProjects !== 'not-set')
            ?
            <>{
                
                
                state.userProjects.map((project) => {
                    return (
                        <ProjectCard 
                        key={Math.floor(Math.random()*1000000)}
                        project={project} />
                    )
                })
            }</>
            :
            <LoaderElement />
        }
        </ProjectCardContainer_Wrapper>
    )
}

const ProjectCardContainer_Wrapper = styled.div`
    width: 100%;
    height: 400px;
    background-color: white;
`

export default ProjectCardContainer;