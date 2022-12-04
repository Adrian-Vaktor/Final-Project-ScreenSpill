import { useEffect, useState } from "react";
import styled from "styled-components";

const ModalBackdrop = ({isInvisible, setIsOpen }) => {

    const handleClick = () => {
        if(setIsOpen){
            setIsOpen(state => !state)
        }
    }
    


    return (

        <>
        {
            isInvisible
            ?
            <ModalBackdrop_Wrapper_Invisible onClick={handleClick}></ModalBackdrop_Wrapper_Invisible>
            :
            <ModalBackdrop_Wrapper onClick={handleClick}></ModalBackdrop_Wrapper>
        }
        
        </>
    )
}

const ModalBackdrop_Wrapper_Invisible = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: white;
    opacity: 0;
`

const ModalBackdrop_Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: white;
    opacity: 0.5;
`

export default ModalBackdrop; 