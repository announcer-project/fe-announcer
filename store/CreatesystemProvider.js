import React, { createContext, useReducer } from "react";

export const CreatesystemContext = createContext({});

const initialState = {
  counter: 0,
  systemname: "",
  newstype: [],
  channelID: "",
  channelaccesstoken: "",
  roleuser: [],
  step: 1,
};

const CreatesystemReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_STEP":
      return {
        ...state,
        step: action.payload,
      };
    case "CHANGE_SYSTEMNAME":
      return {
        ...state,
        systemname: action.payload,
      };
    case "CHANGE_NEWSTYPE":
      return {
        ...state,
        newstype: action.payload,
      };
    case "CHANGE_CHANNELID":
      return {
        ...state,
        channelID: action.payload,
      };
    case "CHANGE_CHANNEL_ACCESS_TOKEN":
      return {
        ...state,
        channelaccesstoken: action.payload,
      };
    case "CHANGE_ROLE_USER":
      return {
        ...state,
        roleuser: action.payload,
      };
  }
};

export const CreatesystemProvider = ({ children }) => {
  const [createsystemState, createsystemDispatch] = useReducer(
    CreatesystemReducer,
    initialState
  );

  const {
    systemname,
    newstype,
    channelID,
    channelaccesstoken,
    roleuser,
    step,
  } = createsystemState;

  const nextStep = (payload) =>
    createsystemDispatch({ type: "NEXT_STEP", payload });
  const changeSystemname = (payload) =>
    createsystemDispatch({ type: "CHANGE_SYSTEMNAME", payload });
  const changeNewstype = (payload) =>
    createsystemDispatch({ type: "CHANGE_NEWSTYPE", payload });
  const changeChannelID = (payload) =>
    createsystemDispatch({ type: "CHANGE_CHANNELID", payload });
  const changeChannelAccessToken = (payload) =>
    createsystemDispatch({ type: "CHANGE_CHANNEL_ACCESS_TOKEN", payload });
  const changeRoleUser = (payload) =>
    createsystemDispatch({ type: "CHANGE_ROLE_USER", payload });

  return (
    <CreatesystemContext.Provider
      value={{
        systemname,
        newstype,
        channelID,
        channelaccesstoken,
        roleuser,
        step,
        nextStep,
        changeSystemname,
        changeNewstype,
        changeChannelID,
        changeChannelAccessToken,
        changeRoleUser,
      }}
    >
      {children}
    </CreatesystemContext.Provider>
  );
};
