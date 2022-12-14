import { createContext, useReducer, useEffect } from "react";

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

      // setBrowserProjects
      case "setBrowserProjects": { 
        
        let tempState = {...state}
        tempState.userProjects = action.data
        return tempState
      }   

      // setPersistedState
      case "setPersistedState": { 
        return action.data
      }   

  
      default:
        throw new Error(`Unrecognized action: ${action.type}`);
    }
  };


//------------------------- Provider

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intitialState);

  const setLocalStorage = (data) => {
    localStorage.setItem("ScreenSpill-UserState", JSON.stringify(data));
  }

const setPersistedState = (data) => {
  setLocalStorage(data)
  dispatch({ type: "setPersistedState", data: data });
}

useEffect(()=> {

  let persistentState = JSON.parse(localStorage.getItem("ScreenSpill-UserState"))
  
  if(persistentState !== null){
    setPersistedState(persistentState)
  }
}, [])



useEffect(() => {
  setLocalStorage(state)
},[state])


  const fetchUserInfo = async (loginId) => {
    try{
        fetch(`/api/userProfile/${loginId}`)
        .then(res => res.json())
        .then(resData => {
          
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
    fetchUserInfo(resData.data.loginId)
  })
  }

  // setUserInfo
  const setUserInfo = (info) => {
    dispatch({ type: "setUserInfo", data: info });
  };

  // Set Browser Projects
  // Immediate update (temporary)
  const setBrowserProjects = async (data) => {
    const tempState = { 
      ...state
    }
    tempState.userProjects.push(data)
    
    dispatch({type: "setBrowserProjects", data: tempState.userProjects})

  }

  // setProjects
  const setProjects = async () => {
    
    try{
      await fetch(`/api/getProjects/${state.userInfo.userId}`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "setProjects", data: data.data });
      })
      
    }catch(err){
      console.log(err);
    }
  }

  const createProject = (projectObj , triggerReload = null) => {

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
    }).then(() => {
      setProjects()

    })
  }


  const deleteProject = (projectId, triggerReload = null) => {

    fetch(`/api/deleteProject/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state.userInfo)
    })
    .then((res) => res.json())
    .then(() => {

      setProjects()
    })
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
              createProject,
              setBrowserProjects,
              setPersistedState,
              deleteProject,
              fetchUserInfo
             },
          }
      }
      >
      {children}
      </UserContext.Provider>
  );
};
  
