import styled from 'styled-components'

import { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';


const ScreenWriter_Page = () => {

    const { 
        state: { state },
        action: { setUser, createUser, setUserInfo, setProjects, createProject },
    } = useContext(UserContext)

    const { projectId } = useParams()

    const [ currentProject, setCurrentProject ] = useState(undefined)

    useEffect(()=> {
        //PERSIST IN MEMORY 


        //find current project 
        const currentProjectFind = state.userProjects.find(element => element.projectId === projectId);
        setCurrentProject(currentProjectFind)
    }, [projectId])


    useEffect(()=> {
        //PERSIST IN MEMORY IF ON PAGE WITH PROPER PROJECT
        

    },[])

    console.log(currentProject);
    

    return (
        <div>
            {projectId}
        {
            currentProject
            ?
            <div>
                {currentProject.title}
                {currentProject.authors}
                {currentProject.mapLocations.length}
            </div>
            :
            <></>
        }
        </div>
        

    )
}


export default ScreenWriter_Page;