import { createContext, useReducer } from "react";

export const UserContext = createContext();



//-------------------------- Reducer 

// Init data struct
const intitialState = {
  userLoginInfo: {}, //AUTH0 - Login AUTH0 info
  userInfo: {}, //MONGO - Info related to the website's profile of the user
  userProjects: [], //MONGO - projects fetched for the user
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

      default:
        throw new Error(`Unrecognized action: ${action.type}`);
    }
  };


//------------------------- Provider

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intitialState);


  // Example
  const setUser = (user) => {
      dispatch({ type: "setUser", data: user });
  };


  return (
      <UserContext.Provider
      value={
          { state: { state },
            action: { 
              setUser,

             },
          }
      }
      >
      {children}
      </UserContext.Provider>
  );
};
  
