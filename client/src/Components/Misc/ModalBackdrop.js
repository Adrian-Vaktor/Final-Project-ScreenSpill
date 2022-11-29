import { useEffect, useState } from "react";
import styled from "styled-components";

const ModalBackdrop = () => {

    return (
        <ModalBackdrop_Wrapper></ModalBackdrop_Wrapper>
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