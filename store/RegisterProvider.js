import React, { createContext, useReducer } from "react";

export const RegisterContext = createContext({});

const initialState = {
  counter: 0,
  email: "",
  firstname: "",
  lastname: "",
  step: 1
};

const registerReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_STEP":
        return {
          ...state,
          step: state.step + action.payload,
      };
    case "CHANGE_EMAIL":
        return {
          ...state,
          email: action.payload,
      };
    case "CHANGE_FNAME":
        return {
          ...state,
          firstname: action.payload,
      };
    case "CHANGE_LNAME":
        return {
          ...state,
          lastname: action.payload,
      };
  }
};

export const RegisterProvider = ({ children }) => {
  const [registerState, registerDispatch] = useReducer(
    registerReducer,
    initialState
  );

  const {email, firstname, lastname, step} = registerState;

  const nextStep = (payload) =>
    registerDispatch({ type: "NEXT_STEP", payload});
  const changeEmail = (payload) =>
    registerDispatch({ type: "CHANGE_EMAIL", payload});
  const changeFirstname = (payload) =>
    registerDispatch({ type: "CHANGE_FNAME", payload});
  const changeLastname = (payload) =>
    registerDispatch({ type: "CHANGE_LNAME", payload});

  return (
    <RegisterContext.Provider value={{ email, firstname, lastname, step, nextStep, changeEmail, changeFirstname, changeLastname }}>
      {children}
    </RegisterContext.Provider>
  );
};
