import { useEffect, useState } from "react";
import styled from "styled-components";

const ModalBackdrop = ({ isOpen, setIsOpen }) => {

    const handleClick = () => {
        setIsOpen(!isOpen)
    }


    return (
        <ModalBackdrop_Wrapper onClick={handleClick}></ModalBackdrop_Wrapper>
    )
}


const ModalBackdrop_Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: white;
    opacity: 0.5;
`

export default ModalBackdrop; 