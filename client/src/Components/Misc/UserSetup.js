import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../Context/UserContext";
import ModalBackdrop from "./ModalBackdrop";


const UserSetup = ({isEdit, setIsEditUserModalOpen}) => {

    const { logout, isAuthenticated } = useAuth0()

    const { 
        state: { state },
        action: { setUser, createUser, setUserInfo, setProjects, createProject, editUserinfo, fetchUserInfo },
    } = useContext(UserContext)
    
    const initInputState = {
        'firstName': state.userLoginInfo.given_name,
        'lastName': state.userLoginInfo.family_name,
        'userHandle': state.userLoginInfo.nickname,
        'email': state.userLoginInfo.email,
        'picture': state.userLoginInfo.picture,
        'media': '',
        'bio': '',
        'loginId': state.userLoginInfo.sub,
        'projects': []
    }

    const initiState = isEdit ? state.userInfo : initInputState
    const initImage = isEdit ? state.userInfo.picture : state.userLoginInfo.picture
    const initMedia = isEdit ? state.userInfo.media : ""

    
    const [ inputsState, setInputsState ] = useState(initiState)
    const [ imageUpload, setImageUpload ] = useState(initImage)


    const [ isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen ] = useState(false)

    

    const handleFileSelect = (e) => {
        let upload = ''
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            upload = reader.result
            setImageUpload(upload)
        })
        reader.readAsDataURL(e.target.files[0])
        handleChangeInput(upload, 'picture')
        
    }

    const handleChangeInput = (e, field) => {
        
        if(Object.keys(inputsState).includes(field)){

            if(field != 'picture'){
                let tempObj = { ...inputsState }
                tempObj[field] = e.target.value
                
                setInputsState(tempObj)
            }
        }
    }

    useEffect(() => {
        if(imageUpload){
            let tempInputsState = {...inputsState}
            tempInputsState.picture = imageUpload
            setInputsState(tempInputsState)
        }

    }, [imageUpload])

    const handleSubmitProfileInfo = () => {

        if(isEdit){

        }else{
            createUser(inputsState)
        }

    }


    const handleEditProfileInfo = () => {

        fetch(`/api/updateUser/${state.userInfo.userId}`,{
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(inputsState)
          })
          .then(res => res.json())
          .then(resData => {
            console.log(resData);
            
            fetchUserInfo(state.userInfo.loginId)
            setIsEditUserModalOpen(false)
          })
    }



    const handleDeleteProfile = () => {
        setIsConfirmDeleteModalOpen(true)

    }

    const handleDeleteProfileConfirm = () => {
        fetch(`/api/deleteUser/${state.userInfo.userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.userInfo)
          })
          .then((res) => res.json())
          .then((data) => {
      
            console.log(data);
            
          })
    }


    return (
        <UserSetup_Wrapper>
            {
                isConfirmDeleteModalOpen
                ?
                <>
                    <ConfirmDeleteDiv>
        
                        <h2>You sure you want to delete your profile?</h2>
                        <ButtonDiv>
                            <button onClick={handleDeleteProfileConfirm}>Yes, delete</button>
                            <button onClick={() => {setIsConfirmDeleteModalOpen(false)}}>No, cancel</button>
                        </ButtonDiv>
                    </ConfirmDeleteDiv>
                    {/* <ModalBackdrop /> */}
                
                </>
                :
                <></>

            }

            <Content>
                <Title>
                    <h2> Welcome to ScreenSpill! </h2>
                    <p> Please confirm your profile information: </p>
                </Title>

                <PreFillInfo>
                    <TextFills>
                        <Prefill_Input>
                            <p>First Name</p>
                            <input onChange={(e) => {handleChangeInput(e, 'firstName')}} id="firstName" value={inputsState.firstName}/>
                        </Prefill_Input>
                        <Prefill_Input>
                            <p>Last Name</p>

                            <input onChange={(e) => {handleChangeInput(e, 'lastName')}} id="lastName" value={inputsState.lastName}/>
                        </Prefill_Input>
                        <Prefill_Input>
                            <p>User Handle</p>

                            <input onChange={(e) => {handleChangeInput(e, 'userHandle')}} id="userHandle" value={inputsState.userHandle}/>
                        </Prefill_Input>
                        <Prefill_Input>
                            <p>Email</p>

                            <input onChange={(e) => {handleChangeInput(e, 'email')}} id="email" value={inputsState.email}/>
                        </Prefill_Input>
                    </TextFills>
                    <ImageFill>
                        {
                            imageUpload 
                            ?
                            <ImageUpload src={imageUpload}/>
                            :
                            <>uploading</>
                        }
                        <UploadButtonStyle htmlFor="imgUpload">Upload New Image</UploadButtonStyle>
                        <ChooseFileInput id="imgUpload" type='file' title="Choose a video please" onChange={handleFileSelect}/>
                    </ImageFill>

                </PreFillInfo>


                <Inputs_Section> 
                    <Input_div>
                        <LabelText>Media</LabelText>

                        <Select_Wrapper>
                                <select defaultValue={initMedia} onChange={(e) => {handleChangeInput(e, 'media')}}name="media" id="media">
                                    <option disabled value="">Choose</option>
                                    <option value="tv">TV</option>
                                    <option value="film">Film</option>
                                    <option value="streaming">Streaming</option>
                                    <option value="web-series">Web Series</option>
                                    <option value="short-format">Short Format</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="stage-play">Stage Play</option>
                                </select>
                            </Select_Wrapper>
                        </Input_div>

                    <Input_div className="textarea_style">
                        <LabelText>Bio</LabelText>
                        <textarea  onChange={(e) => {handleChangeInput(e, 'bio')}} value={inputsState.bio} placeholder="I just started writing a page per day and now I have...">
                        </textarea>
                    </Input_div>

                        {
                            isEdit
                            ?
                            <>
                                <Input_div className={'submit-div'}>
                                    <SubmitButton onClick={handleEditProfileInfo}>Confirm Edit</SubmitButton>

                                </Input_div>
                                <DeleteButton onClick={handleDeleteProfile}>Delete Profile</DeleteButton>
                            
                            </>
                            :
                            <Input_div className={'submit-div'}>
                                <SubmitButton onClick={handleSubmitProfileInfo}>Submit</SubmitButton>
                            </Input_div>
                        }
                </Inputs_Section>
            </Content>
        </UserSetup_Wrapper>
    )
}
const SureToDelete = styled.div`

`

const ButtonDiv = styled.div`

    // z-index: 100000;
`

const ConfirmDeleteDiv = styled.div`
    position: absolute;
    z-index: 150;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    h2{
        margin: 0;
        padding: 0;
    }




`

const DeleteButton = styled.button`

    color: red

`

const ImageFill = styled.div`

    display: flex;
    flex-direction: column;
    margin-left: 10px;
    align-items: center;
    width: 25%;
    img{
    }

`

const TextFills = styled.div`
    width: 45%;
    padding-top: 20px;
`

const Prefill_Input = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    p{
        margin: 0;
    }
    input{
        width: 55%;
        margin-bottom: 15px;

    }
`

const Title = styled.div`
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2{
        margin: 0
    }
    p{
        margin: 5px 0 
    }
`

const SubmitButton = styled.button`

`

const UploadButtonStyle = styled.label`
    font-size: 10px;
    &&:hover{
        cursor: pointer;
    }
`

const ChooseFileInput = styled.input`
    display: none;
`


const LabelText = styled.p`
`

const ImageUpload = styled.img`
    // width: 200px;
    margin-bottom: 10px;
    object-fit: cover;
    width: 100px;
    height: 100px;
    border-radius: 50%;

`

const PreFillInfo = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    width: 80%;


`

const Input_div = styled.div`
    margin: 0;
    width: 70%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .center-style {
        text-align: center;
    }
    &&.textarea_style{
        height: 180px;
    }

    textarea{
        width: 80%;
        height: 150px;
        margin: 0;
        width: 60%;
        resize: none;
        padding: 10px;

    }

    &&.submit-div{
        justify-content: flex-end;
    }
`

const Inputs_Section = styled.div`
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;

`
const Select_Wrapper = styled.div`
    
    select{
        width: 100%;
        height: 25px;
        text-align: center;
        font-size: 15px;
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
    // padding: 30px;
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
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;


`

export default UserSetup;