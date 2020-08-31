import React, { createContext, useReducer } from "react";

export const LineRegisterContext = createContext({});

const initialState = {
  lineid: "",
  email: "",
  firstname: "",
  lastname: "",
  imageUrl: "",
  step: 1,
  newstypes: [],
  roleSelected: -1,
  roles: [],
  haveuser: false,
};

const lineRegisterReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_STEP":
      return {
        ...state,
        step: action.payload,
      };
    case "CHANGE_LINE_ID":
      return {
        ...state,
        lineid: action.payload,
      };
    case "CHANGE_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "CHANGE_IMAGE_URL":
      return {
        ...state,
        imageUrl: action.payload,
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
    case "CHANGE_NEWS_TYPES":
      return {
        ...state,
        newstypes: action.payload,
      };
    case "CHANGE_ROLES":
      return {
        ...state,
        roles: action.payload,
      };
    case "SELECT_ROLE":
      return {
        ...state,
        roleSelected: action.payload,
      };
    case "CHANGE_HAVE_USER":
      return {
        ...state,
        haveuser: action.payload,
      };
  }
};

export const LineRegisterProvider = ({ children }) => {
  const [lineRegisterState, lineRegisterDispatch] = useReducer(
    lineRegisterReducer,
    initialState
  );

  const {
    lineid,
    email,
    imageUrl,
    firstname,
    lastname,
    step,
    newstypes,
    roleSelected,
    roles,
    haveuser,
  } = lineRegisterState;

  const nextStep = (payload) =>
    lineRegisterDispatch({ type: "NEXT_STEP", payload });
  const changeLineID = (payload) =>
    lineRegisterDispatch({ type: "CHANGE_LINE_ID", payload });
  const changeEmail = (payload) =>
    lineRegisterDispatch({ type: "CHANGE_EMAIL", payload });
  const changeImageUrl = (payload) =>
    lineRegisterDispatch({ type: "CHANGE_IMAGE_URL", payload });
  const changeFirstname = (payload) =>
    lineRegisterDispatch({ type: "CHANGE_FNAME", payload });
  const changeLastname = (payload) =>
    lineRegisterDispatch({ type: "CHANGE_LNAME", payload });
  const changeNewstypes = (payload) =>
    lineRegisterDispatch({ type: "CHANGE_NEWS_TYPES", payload });
  const changeRoles = (payload) =>
    lineRegisterDispatch({ type: "CHANGE_ROLES", payload });
  const selectRole = (payload) =>
    lineRegisterDispatch({ type: "SELECT_ROLE", payload });
  const changeHaveUser = (payload) =>
    lineRegisterDispatch({ type: "CHANGE_HAVE_USER", payload });

  return (
    <LineRegisterContext.Provider
      value={{
        lineid,
        email,
        imageUrl,
        firstname,
        lastname,
        step,
        newstypes,
        roleSelected,
        roles,
        haveuser,
        nextStep,
        changeLineID,
        changeImageUrl,
        changeEmail,
        changeFirstname,
        changeLastname,
        changeNewstypes,
        changeRoles,
        selectRole,
        changeHaveUser,
      }}
    >
      {children}
    </LineRegisterContext.Provider>
  );
};
