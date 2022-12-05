import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import { UserContext } from "../Context/UserContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import ModalBackdrop from "./ModalBackdrop";
import UserSetup from "./UserSetup";


const SignInDIv = ({setIsEditUserModalOpen}) => {

    const { 
        state: { state },
        action: { setUser, createUser, setUserInfo, setProjects, createProject },
    } = useContext(UserContext)


    const [ imageUpload, setImageUpload ] = useState(state.userInfo.picture)


    const handleOpenEditUserModal = () => {
        setIsEditUserModalOpen(state => !state)

    }

    return (
        <SignInDiv_Wrapper>
            <ImageUpload src={imageUpload}/>
            <p>{state.userInfo.userHandle}</p>
            <Button onClick={handleOpenEditUserModal}>Edit User Info</Button>
            <SignInWrapper>
                <LoginButton />
                <LogoutButton />
            </SignInWrapper>

        </SignInDiv_Wrapper>
    )
}

const Button = styled.button`
    border: none;
    background-color: lightBlue;
    width: 90px;
    height: 40px;
    border-radius: 5px;
    margin-right: 5px;
    margin-left: 5px;

    &&:hover{
        cursor: pointer;
    }

`

const SignInWrapper = styled.div`

`

const ImageUpload = styled.img`
    // width: 200px;
    margin-bottom: 10px;
    object-fit: cover;
    width: 100px;
    height: 100px;
    border-radius: 50%;

`


const SignInDiv_Wrapper = styled.div`
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    max-height: 300px;
    width: 200px;
    background-color: white;
    left: 100vw;
    transform: translate(-100%,20px);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    z-index:2;

`

export default SignInDIv;