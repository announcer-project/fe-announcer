import React, { createContext, useReducer } from "react";

export const RegisterContext = createContext({});

const initialState = {
  counter: 0,
  email: "",
  firstname: "",
  lastname: "",
  image: "",
  step: 1,
  user: {}
};

const registerReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_STEP":
        return {
          ...state,
          step: action.payload,
      };
    case "CHANGE_EMAIL":
        return {
          ...state,
          email: action.payload,
      };
    case "CHANGE_IMAGE":
        return {
          ...state,
          image: action.payload,
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
    case "SET_USER":
        return {
          ...state,
          user: action.payload,
      };
  }
};

export const RegisterProvider = ({ children }) => {
  const [registerState, registerDispatch] = useReducer(
    registerReducer,
    initialState
  );

  const {email, image, firstname, lastname, step, user} = registerState;

  const nextStep = (payload) =>
    registerDispatch({ type: "NEXT_STEP", payload});
  const changeEmail = (payload) =>
    registerDispatch({ type: "CHANGE_EMAIL", payload});
  const changeImage = (payload) =>
    registerDispatch({ type: "CHANGE_IMAGE", payload});
  const changeFirstname = (payload) =>
    registerDispatch({ type: "CHANGE_FNAME", payload});
  const changeLastname = (payload) =>
    registerDispatch({ type: "CHANGE_LNAME", payload});
  const setUser = (payload) =>
    registerDispatch({ type: "SET_USER", payload});

  return (
    <RegisterContext.Provider value={{ email, image, firstname, lastname, step,user, nextStep, changeEmail, changeImage, changeFirstname, changeLastname, setUser }}>
      {children}
    </RegisterContext.Provider>
  );
};
