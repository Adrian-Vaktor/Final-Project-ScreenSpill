import { createContext, useReducer } from "react";

export const UserContext = createContext();



//-------------------------- Reducer 

// Init data struct
const intitialState = {
  userLoginInfo: 'not-set', //AUTH0 - Login AUTH0 info
  userInfo: 'not-set', //MONGO - Info related to the website's profile of the user
  userProjects: 'not-set', //MONGO - projects fetched for the user
};

// Reducer
const reducer = (state, action) => {
    switch (action.type) {

      // setUser
      case "setUser": { 
        let tempState = {...state}
        tempState.userLoginInfo = action.data
        return tempState
      }  

      // setUserInfo
      case "setUserInfo": { 
        let tempState = {...state}
        tempState.userInfo = action.data
        return tempState
      }  

      // setProjects
      case "setProjects": { 
        let tempState = {...state}
        tempState.userProjects = action.data
        return tempState
      }  

      default:
        throw new Error(`Unrecognized action: ${action.type}`);
    }
  };


//------------------------- Provider

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intitialState);

  const fetchUserInfo = async (userId) => {
    try{
        fetch(`/api/userProfile/${userId}`)
        .then(res => res.json())
        .then(resData => {
          console.log(resData);
          
            if(!resData.data){
              setUserInfo('set-up')
            }else{
              setUserInfo(resData.data)
            }
          }
        )
        
    }catch(err){
        return err
    }
  }

  // setUser
  const setUser = (user) => {
    dispatch({ type: "setUser", data: user });
    fetchUserInfo(user.sub)
  };

  //createUser
  const createUser = (user) => {
    fetch('/api/createUserProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(resData => {
    console.log('HEY ', resData.data.loginId);
    fetchUserInfo(resData.data.loginId)
  })
  }

  // setUserInfo
  const setUserInfo = (info) => {
    dispatch({ type: "setUserInfo", data: info });
  };

  // setProjects
  const setProjects = async () => {

    try{
      await fetch(`/api/getProjects/${state.userInfo.loginId}`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "setProjects", data: data });
      })
      
    }catch(err){
      console.log(err);
    }
  }

  const createProject = (projectObj) => {

    //might want to add failsafe if gates here to make sure user is loaded
    const tempProject = {
      userId : state.userInfo.userId,
      loginId : state.userInfo.loginId,

      ...projectObj
    }    

    fetch('/api/createProject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tempProject)
  }).then()
    // dispatch({ type: "createProject", data: tempProject });

  }

  return (
      <UserContext.Provider
      value={
          { state: { state },
            action: { 
              setUser,
              createUser,
              setUserInfo,
              setProjects,
              createProject
             },
          }
      }
      >
      {children}
      </UserContext.Provider>
  );
};
  
