import React, { useContext } from "react";
import { CreatesystemContext } from "../../../store/CreatesystemProvider";
import { NewsTypeBox, NextButton, BackButton } from "./Components";
import axios from "axios";
import cookie from "../../../tools/cookie";
import Router from "next/router";

const ShowLineOADetail = (props) => {
  if (props.channelID !== "") {
    return (
      <div className="px-3">
        <span>
          <b>Channel ID : </b>
          {props.channelID}
        </span>
        <div className="pt-1">
          <span>
            <b>Channel Access Token : </b>
            <span style={{ wordBreak: "break-all" }}>
              {props.channelaccesstoken}
            </span>
          </span>
        </div>
        <div className="pt-1">
          <b>Role User</b>
          <div>
            {props.roleUsers.map((role) => {
              return (
                <div className="d-inline-block mr-2">
                  <NewsTypeBox background={true} color={true}>
                    {role}
                  </NewsTypeBox>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="text-center py-3" style={{border:"1px solid #CE0000", color:"#CE0000"}}>
      Not connect line official account
    </div>
  );
};
export default function ConfirmStep() {
  const {
    systemname,
    newstype,
    channelID,
    channelaccesstoken,
    roleuser,
    nextStep,
  } = useContext(CreatesystemContext);
  console.log("newstype", newstype);

  const onCreateSystem = () => {
    let data = {
      systemname: systemname,
      newstypes: newstype,
      lineoa: {
        channelID: channelID,
        channelAccessToken: channelaccesstoken,
        roleUsers: roleuser,
      },
    };
    axios
      .post(`${process.env.REACT_APP_BE_PATH}/system/create`, data, {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(),
        },
      })
      .then((res) => {
        console.log("response", res.data);
        Router.push("/console/systems");
      })
      .catch((err) => {
        console.log("error", err.response.data);
      });
  };

  return (
    <div>
      <p>
        <b>System name : </b>
        {systemname}
      </p>
      <p>
        <b>News type</b>
        <div>
          {newstype.map((newstype) => {
            return (
              <div className="d-inline-block mr-2">
                <NewsTypeBox background={true} color={true}>
                  {newstype}
                </NewsTypeBox>
              </div>
            );
          })}
        </div>
      </p>
      <div>
        <span>
          <b>Line Official Account</b>
        </span>
        <div className="pt-1">
          <ShowLineOADetail
            channelID={channelID}
            channelAccessToken={channelaccesstoken}
            roleUsers={roleuser}
          />
        </div>
      </div>
      <div className="mt-5 d-flex justify-content-between">
        <BackButton
          className="px-4 py-2 font-small"
          onClick={() => nextStep(2)}
        >
          Back
        </BackButton>
        <NextButton
          onClick={() => onCreateSystem()}
          className="px-4 py-2 font-small ml-2"
        >
          Create system
        </NextButton>
      </div>
    </div>
  );
}
