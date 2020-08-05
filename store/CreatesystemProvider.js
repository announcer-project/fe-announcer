import React, { createContext, useReducer } from "react";

export const CreatesystemContext = createContext({});

const initialState = {
    counter: 0,
    systemname: "",
    newstype: [],
    channelID: "",
    channelsecret: "",
    step: 1
};

const CreatesystemReducer = (state, action) => {
    switch (action.type) {
        case "NEXT_STEP":
            return {
                ...state,
                step: state.step + action.payload,
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
        case "CHANGE_CHANNELSECRET":
            return {
                ...state,
                channelsecret: action.payload,
            };
    }
};

export const CreatesystemProvider = ({ children }) => {
    const [createsystemState, createsystemDispatch] = useReducer(
        CreatesystemReducer,
        initialState
    );

    const { systemname, newstype, channelID, channelsecret, step } = createsystemState;

    const nextStep = (payload) =>
        createsystemDispatch({ type: "NEXT_STEP", payload });
    const changeSystemname = (payload) =>
        createsystemDispatch({ type: "CHANGE_SYSTEMNAME", payload });
    const changeNewstype = (payload) =>
        createsystemDispatch({ type: "CHANGE_NEWSTYPE", payload });
    const changeChannelID = (payload) =>
        createsystemDispatch({ type: "CHANGE_CHANNELID", payload });
    const changeChannelSecret = (payload) =>
        createsystemDispatch({ type: "CHANGE_CHANNELSECRET", payload });

    return (
        <CreatesystemContext.Provider value={{ systemname, newstype, channelID, channelsecret, step, nextStep, changeSystemname, changeNewstype, changeChannelID, changeChannelSecret }}>
            {children}
        </CreatesystemContext.Provider>
    );
};