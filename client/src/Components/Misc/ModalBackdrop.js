import { useEffect, useState } from "react";
import styled from "styled-components";

const ModalBackdrop = ({isInvisible, setIsOpen, isBlack }) => {

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
            <>
                {
                    isBlack
                    ?
                    <ModalBackdrop_Wrapper_Invisible className={'black'} onClick={handleClick}></ModalBackdrop_Wrapper_Invisible>
                    :
                    <ModalBackdrop_Wrapper_Invisible onClick={handleClick}></ModalBackdrop_Wrapper_Invisible>

                }
            </>
            :
            <>
                {
                    isBlack
                    ?
                    <ModalBackdrop_Wrapper className={'black'} onClick={handleClick}></ModalBackdrop_Wrapper>
                    :
                    <ModalBackdrop_Wrapper onClick={handleClick}></ModalBackdrop_Wrapper>

                }
            </>
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

    &.black{
        background-color: black;
    }
`

const ModalBackdrop_Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: white;
    opacity: 0.5;

    &.black{
        background-color: black;
    }
`

export default ModalBackdrop; 