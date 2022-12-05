import styled from 'styled-components'

import LoginButton from '../Misc/LoginButton'
import LogoutButton from '../Misc/LogoutButton'


const Home_Page = () => {

    return (
        <>
            <HomePage_Wrapper>
                <Header>
                    <h2>ScreenSpill</h2>
                    <SignInWrapper>
                        <LoginButton />
                        <LogoutButton />
                    </SignInWrapper>
                </Header>
                <Fishes>
                    <PageFish style={{offsetPath: `path("M 0 0 C 0 30 20 500 500 500 C 900 500 700 900 1000 1000 C 1400 1200 1300 1500 1600 1800")`}}></PageFish>
                    <PageFish style={{offsetPath: `path("M 0 0 C 395 14 320 123 500 500 C 600 800 700 900 800 1300 C 900 1800 1300 1500 1700 2200")`}}/>
                    <PageFish style={{offsetPath: `path("M -30 -30 C 166 452 156 801 156 1120 C 191 1554 211 1828 495 1883 C 900 1800 1268 1165 2389 1659")`}}/>

                </Fishes>
                    {/* <Img src={"https://images.ctfassets.net/3s5io6mnxfqz/6NT8egbrktT7iCXOveHa4o/383111b087d8a26ad9e0567279f5374d/AdobeStock_211622740.jpeg"}></Img> */}
                <SectionDiv>
                    <h2>ScreenPlay Creation Studio</h2>
                    {/* <Img src={"https://img.icons8.com/ios-filled/500/spill.png"}></Img> */}
                </SectionDiv>
            </HomePage_Wrapper>
            <Background />
        </>
    )
}



const Img = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;

`

const SectionDiv = styled.div`
    background-color: white;
    height: 1000px;
    width: 200%;
    transform: rotate(-4deg);
    position: absolute;
    top: 60vh;
    box-shadow: rgba(0, 0, 0, 0.34) 0px 100px 100px;

    h2{
        position: relative;
        top: -160px;
        left: 20vw;
        color: white;
        font-size: 80px;

        @keyframes upAnim {
            0%  {top: 20px; color: white }
            30%  {top: 20px; color: white }
            55% {top: -160px; color: white }
            80% {top: -160px;; transform: rotate(0deg); color: white;}
            100% {top: -160px; color: white; }

          }

            animation-name: upAnim;
            animation-iteration-count: 1;
            animation-duration: 4s;
    }



`
const Background = styled.div`
    // background-image: url(https://www.nyfa.edu/student-resources/wp-content/uploads/2017/05/startup-594090_960_720.jpg);
    background-size: cover;
    opacity: 10%;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;

 

`

const HomePage_Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 100;
    overflow: hidden;

 

`

const Fishes = styled.div`
    z-index: 0;

`

const PageFish = styled.div`
    // offset-path: path("M 0 0 C 0 30 20 500 500 500 C 900 500 700 900 1000 1000 C 1400 1200 1300 1500 1600 1800");
    animation: move 5000ms infinite ease-in-out;
    // animation-iteration-count: infinte;

    position: relative;

    top: -90px;
    left: 300px;
    width: 55px;
    height: 40px;
    background: white;
    z-index: 0;
  
  @keyframes move {
    10% {
      offset-distance: 0%;
    }
    80% {
      offset-distance: 100%;
    }
    100% {
        offset-distance: 100%;
      }
      
  }

`

const Header = styled.div`
    position: relative;
    width: 100vw;
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    overflow: hidden;
    z-index: 100;

    h2{
        position: relative;
        top: 10px;
        left: -40px;
        color: #c5d4cb;
        font-size: 100px;

        @keyframes example {
            0%   {top: 100px; }
            15%  {transform: rotate(-7deg);}
            50% {top: 8px;}
            75% {top: 9px; transform: rotate(0deg)}
            100% {top: 10px;}

          }

            animation-name: example;
            animation-iteration-count: 1;
            animation-duration: 2s;
    }

`

const SignInWrapper = styled.div`

`



export default Home_Page;