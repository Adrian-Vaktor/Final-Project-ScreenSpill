import styled from 'styled-components'
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../Misc/LogoutButton';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';



const ProjectManager_Page = () => {

    const { 
        state: { state },
        action: { setUser },
    } = useContext(UserContext)

    const { user, isAuthenticated } = useAuth0()
    const navigate = useNavigate()


    useEffect(()=> {
        console.log(state);
    }, [state])
    

    const fetchUserInfo = async () => {
        try{
            fetch(`/api/userProfile/${user.sub}`)
            .then(res => res.json())
            .then(data => {
                if(data.data.length === 0){
                    // navigate('/ux/profile-Setup')
                }
            }
            )
            
        }catch(err){
            return err
        }
    }

    useEffect(() => {
        console.log((user, isAuthenticated));
        console.log();
        
        if(user, isAuthenticated){
            setUser(user)

            fetchUserInfo()
            // fetch('/api/hey').then(data => data.json).then(res => console.log(res))

        }
    },[user])


    
    return (
        <>
        <LogoutButton></LogoutButton>
            {
                <article className='column'>
                    {/* {JSON.stringify(user)} */}
                    {user?.name}
                </article>
            }
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
