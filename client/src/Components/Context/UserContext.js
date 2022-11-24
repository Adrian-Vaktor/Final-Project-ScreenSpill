import { createContext, useReducer } from "react";

export const UserContext = createContext();

const intitialState = {};
const reducer = (state = intitialState, action) => {
    switch (action.type) {

      // Example
      case "example": {
        return (
            { ...intitialState}
        );
      }  
      default:
        throw new Error(`Unrecognized action: ${action.type}`);
    }
  };

export const UserProvider = ({ children }) => {
const [state, dispatch] = useReducer(reducer, intitialState);


// Example
const example = (data) => {
    dispatch({ type: "example", ...data });
};

return (
    <UserContext.Provider
    value={
        {
        state,
        action: { 
            example
            },
        }
    }
    >
    {children}
    </UserContext.Provider>
);
};
  
