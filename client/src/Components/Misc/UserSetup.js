import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../Context/UserContext";

const UserSetup = () => {

    const { 
        state: { state },
        action: { setUser, createUser, setUserInfo, setProjects, createProject },
    } = useContext(UserContext)

    const [ imageUpload, setImageUpload ] = useState(state.userLoginInfo.picture)

    const handleFileSelect = (e) => {
        let upload = ''
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            upload = reader.result
            setImageUpload(upload)
        })
        reader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        console.log(imageUpload);
    }, [imageUpload])

    return (
        <UserSetup_Wrapper>

            <Content>

                <PreFillInfo>
                    <input id="id" value={state.userLoginInfo.email}/>
                    <input id="given-name" value={state.userLoginInfo.given_name}/>
                    <input id="family-name" value={state.userLoginInfo.family_name}/>
                    <input id="family-name" value={state.userLoginInfo.nickname}/>
                    <input type='file' onChange={handleFileSelect}/>
                    <ImageUpload src={imageUpload}/>

                    {
                    /* <input value={}/>
                    <input value={}/>
                    <input value={}/>
                    <input value={}/> */
                    }

                </PreFillInfo>
                <Select_Wrapper>
                    <select name="Style" id="Style">
                        <option defualt disabled value="">Genre</option>
                        <option value="tv">TV</option>
                        <option value="film">Film</option>
                        <option value="streaming">Streaming</option>
                        <option value="web-series">Web Series</option>
                        <option value="short-format">Short Format</option>
                        <option value="commercial">Commercial</option>
                        <option value="stage-play">Stage Play</option>
                    </select>
                </Select_Wrapper>
                <Inputs_Section> 
                    <Input_div>
                        <input className="center-style" id="Profile-Handle" placeholder="Rony156"/>
                    </Input_div>
                    <Input_div className="textarea_style">
                        <textarea value={''} placeholder="I just started writing a page per day and now I have...">
                        </textarea>
                    </Input_div>

                    <Input_div>
                        <input id=""/>
                    </Input_div>
                    <Input_div>
                        <input id=""/>
                    </Input_div>
                    <Input_div>
                        <input id=""/>
                    </Input_div>
                    <Input_div>
                        <input id=""/>
                    </Input_div>
                </Inputs_Section>

                {/* <input onChange={(e) => {handleInputChange(e, 'TV')}}/>
                <input onChange={(e) => {handleInputChange(e, 'Film')}}/>
                <input onChange={(e) => {handleInputChange(e, 'WebSeries')}}/>
                <input onChange={(e) => {handleInputChange(e, '')}}/> */}
            </Content>
        </UserSetup_Wrapper>
    )
}

const ImageUpload = styled.img`
    width: 200px;
`

const PreFillInfo = styled.div`

`

const Input_div = styled.div`
    margin: 0;
    width: 70%;
    height: 50px;
    .center-style {
        text-align: center;
    }
    &&.textarea_style{
        height: 180px
    }

    textarea{
        width: 500px;
        height: 150px;
        margin: 0;
    }
`

const Inputs_Section = styled.div`
    margin: 0;
    display: flex;
    flex-direction: column;

`
const Select_Wrapper = styled.div`
    
    select{
        width: 300px;
        height: 45px;
        text-align: center;
        font-size: 20px;
        option{
            text-align: center;
            position: absolute;
            top: 100%;

        }
    }
`
const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
`

const UserSetup_Wrapper = styled.div`
    width: 90%;
    height: 80%;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    border-radius: 10px;

`

export default UserSetup;