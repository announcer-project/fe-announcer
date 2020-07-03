import React, { createContext, useReducer } from "react";

export const CounterContext = createContext({});

const initialState = {
  counter: 0,
};

const counterReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COUNTER":
      return {
        ...state, // copy state
        counter: state.counter + action.payload, // set state counter
      };
    case "SUB_COUNTER":
      return {
        ...state, // copy state
        counter: state.counter - action.payload, // set state counter
      };
  }
};

export const CounterProvider = ({ children }) => {
  const [counterState, counterDispatch] = useReducer(
    counterReducer,
    initialState
  );

  const { counter } = counterState;

  const addCounter = (payload) =>
    counterDispatch({ type: "ADD_COUNTER", payload }); // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const subCounter = (payload) =>
    counterDispatch({ type: "SUB_COUNTER", payload }); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ

  return (
    <CounterContext.Provider value={{ counter, addCounter, subCounter }}>
      {children}
    </CounterContext.Provider>
  );
};
