import React, { createContext, useReducer } from "react";

export const CreateLineBroadcastContext = createContext({});

const initialState = {
  everyone: false,
  checknewstypes: false,
  newstypes: null,
  checktargetgroups: false,
  targetgroups: null,
  checkusers: false,
  users: null,
  usersSelect: [],
  messages: [
    {
      type: "text",
      data: "",
    },
  ],
  news: [],
  step: 1,
};

const createLineBroadcastReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_EVERYONE":
      return {
        ...state, // copy state
        everyone: !action.payload, // set state counter
        checknewstypes: false,
        checktargetgroups: false,
        checkusers: false,
      };
    case "CHECK_NEWSTYPES":
      return {
        ...state, // copy state
        checknewstypes: !action.payload,
        everyone: false,
      };
    case "SELECT_NEWSTYPES":
      return {
        ...state, // copy state
        newstypes: action.payload, // set state counter
      };
    case "CHECK_TARGETGROUPS":
      return {
        ...state, // copy state
        checktargetgroups: !action.payload, // set state counter
        everyone: false,
      };
    case "SELECT_TARGETGROUPS":
      return {
        ...state, // copy state
        targetgroups: action.payload, // set state counter
      };
    case "CHECK_USERS":
      return {
        ...state, // copy state
        checkusers: !action.payload, // set state counter
        everyone: false,
      };
    case "SELECT_USERS":
      return {
        ...state, // copy state
        users: action.payload, // set state counter
      };
    case "CHANGE_USERSSELECT":
      return {
        ...state, // copy state
        usersSelect: action.payload, // set state counter
      };
    case "CHANGE_MESSAGES":
      return {
        ...state, // copy state
        messages: action.payload, // set state counter
      };
    case "SET_NEWS":
      return {
        ...state, // copy state
        news: action.payload, // set state counter
      };
    case "CHANGE_STEP":
      return {
        ...state, // copy state
        step: action.payload, // set state counter
      };
  }
};

export const CreateLineBroadcastProvider = ({ children }) => {
  const [createLineBroadcastState, createLineBroadcastDispatch] = useReducer(
    createLineBroadcastReducer,
    initialState
  );

  const {
    everyone,
    checknewstypes,
    newstypes,
    checktargetgroups,
    targetgroups,
    checkusers,
    users,
    usersSelect,
    messages,
    news,
    step,
  } = createLineBroadcastState;

  const selectEveryone = (payload) =>
    createLineBroadcastDispatch({ type: "SELECT_EVERYONE", payload }); // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const checkNewsTypes = (payload) =>
    createLineBroadcastDispatch({ type: "CHECK_NEWSTYPES", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const selectNewsTypes = (payload) =>
    createLineBroadcastDispatch({ type: "SELECT_NEWSTYPES", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const checkTargetGroups = (payload) =>
    createLineBroadcastDispatch({ type: "CHECK_TARGETGROUPS", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const selectTargetGroups = (payload) =>
    createLineBroadcastDispatch({ type: "SELECT_TARGETGROUPS", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const checkUsers = (payload) =>
    createLineBroadcastDispatch({ type: "CHECK_USERS", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const selectUsers = (payload) =>
    createLineBroadcastDispatch({ type: "SELECT_USERS", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const changeUsersSelect = (payload) =>
    createLineBroadcastDispatch({ type: "CHANGE_USERSSELECT", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const changeMessages = (payload) =>
    createLineBroadcastDispatch({ type: "CHANGE_MESSAGES", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const setNews = (payload) =>
    createLineBroadcastDispatch({ type: "SET_NEWS", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const changeStep = (payload) =>
    createLineBroadcastDispatch({ type: "CHANGE_STEP", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ

  return (
    <CreateLineBroadcastContext.Provider
      value={{
        everyone,
        checknewstypes,
        newstypes,
        checktargetgroups,
        targetgroups,
        checkusers,
        users,
        usersSelect,
        messages,
        news,
        step,
        selectEveryone,
        checkNewsTypes,
        selectNewsTypes,
        checkTargetGroups,
        selectTargetGroups,
        checkUsers,
        selectUsers,
        changeUsersSelect,
        changeMessages,
        setNews,
        changeStep,
      }}
    >
      {children}
    </CreateLineBroadcastContext.Provider>
  );
};
