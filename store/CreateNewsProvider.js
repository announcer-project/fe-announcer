import React, { createContext, useReducer } from "react";

export const CreateNewsContext = createContext({});

const initialState = {
  title: "",
  body: "",
  expiredateStatus: false,
  expiredate: null,
  postdate: {},
  fileImage: [],
  newsTypes: [],
  step: 1,
};

const createNewsReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TITLE":
      return {
        ...state, // copy state
        title: action.payload, // set state counter
      };
    case "CHANGE_BODY":
      return {
        ...state, // copy state
        body: action.payload, // set state counter
      };
    case "CHANGE_STATUS_EXPIREDATE":
      return {
        ...state, // copy state
        expiredateStatus: !action.payload, // set state counter
      };
    case "CHANGE_EXPIREDATE":
      return {
        ...state, // copy state
        expiredate: action.payload, // set state counter
      };
    case "SET_POSTDATE":
      return {
        ...state, // copy state
        postdate: action.payload, // set state counter
      };
    case "CHANGE_FILE_IMAGE":
      return {
        ...state, // copy state
        fileImage: action.payload, // set state counter
      };
    case "SELECT_NEWS_TYPE":
      return {
        ...state, // copy state
        newsTypes: action.payload, // set state counter
      };
    case "CHANGE_STEP":
      return {
        ...state, // copy state
        step: action.payload, // set state counter
      };
  }
};

export const CreateNewsProvider = ({ children }) => {
  const [createNewsState, createNewsDispatch] = useReducer(
    createNewsReducer,
    initialState
  );

  const {
    title,
    body,
    expiredateStatus,
    expiredate,
    postdate,
    fileImage,
    newsTypes,
    step,
  } = createNewsState;

  const changeTitle = (payload) =>
    createNewsDispatch({ type: "CHANGE_TITLE", payload }); // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const changeBody = (payload) =>
    createNewsDispatch({ type: "CHANGE_BODY", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const changeStatusExpiredate = (payload) =>
    createNewsDispatch({ type: "CHANGE_STATUS_EXPIREDATE", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const changeExpiredate = (payload) =>
    createNewsDispatch({ type: "CHANGE_EXPIREDATE", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const changeFileImage = (payload) =>
    createNewsDispatch({ type: "CHANGE_FILE_IMAGE", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const selectNewsType = (payload) =>
    createNewsDispatch({ type: "SELECT_NEWS_TYPE", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const changeStep = (payload) =>
    createNewsDispatch({ type: "CHANGE_STEP", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const setPostdate = (payload) =>
    createNewsDispatch({ type: "SET_POSTDATE", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ

  return (
    <CreateNewsContext.Provider
      value={{
        title,
        body,
        expiredateStatus,
        expiredate,
        fileImage,
        newsTypes,
        step,
        postdate,
        changeTitle,
        changeBody,
        changeStatusExpiredate,
        changeExpiredate,
        changeFileImage,
        selectNewsType,
        changeStep,
        setPostdate,
      }}
    >
      {children}
    </CreateNewsContext.Provider>
  );
};
