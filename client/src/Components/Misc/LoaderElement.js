import styled from "styled-components";
import { Loader } from 'react-feather';


const LoaderElement = () => {
    
    return (
        
        <>
            <LoaderWrapper>
                {/* <img src="https://cdn4.iconfinder.com/data/icons/web-design-device-solid-style-set-2/91/Web_-_Design_-_Device_119-512.png" alt='loadbucketIcon'/> */}
            </LoaderWrapper>

            <AnimWrapper>
                <AnimDiv />
            </AnimWrapper>

        
        </>
    )
}


const AnimDiv = styled.div`
    @keyframes animateRed {
        0%   {background-color: red; width:0px; height:0px; opacity: 70%;}
        25%  {background-color: oange;}
        50%  {background-color: lemon; }
        99.9% {background-color: blue; width:1000px; height:1000px; }
        100% {opacity: 0%;}
    }
        border-radius: 50%;
        width: 100px;
        height: 100px;
        background-color: red;
        animation-name: animateRed;
        animation-iteration-count: 100;

        animation-duration: 1s;

`
const AnimWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 9;
    width: 100vw;
    height: 100vh;
`


const LoaderWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 10;
    width: 100vw;
    height: 100vh;
`

export default LoaderElement; 