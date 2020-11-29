import React, { useContext, useState } from "react";
import { CreatesystemContext } from "../../../store/CreatesystemProvider";
import { NewsTypeBox } from "./Components";
import Button from "../../common/Button";
import axios from "axios";
import cookie from "../../../tools/cookie";
import Router from "next/router";
import logo from "./ProfileImage.json";
import Swal from "sweetalert2";
import { LoadingOutlined } from "@ant-design/icons";

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
              {props.channelAccessToken}
            </span>
          </span>
        </div>
        <div className="pt-1">
          <b>Role User</b>
          <div>
            {props.roleUsers.map((role, key) => {
              return (
                <div
                  key={key}
                  className="mt-2 d-flex justify-content-between border p-3"
                >
                  <div>
                    <span>{role.rolename}</span>
                  </div>
                  <div>
                    <span className="mr-3">
                      {role.require
                        ? "Must approve"
                        : "No approval is required"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="text-center py-3"
      style={{ border: "1px solid #CE0000", color: "#CE0000" }}
    >
      Not connect line official account
    </div>
  );
};
export default function ConfirmStep() {
  const {
    image,
    systemname,
    newstype,
    channelID,
    channelaccesstoken,
    roleuser,
    nextStep,
  } = useContext(CreatesystemContext);
  const [loading, setLoading] = useState(false);

  const Alert = (text) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });
  };

  const onCreateSystem = () => {
    if (!loading) {
      setLoading(true);
      let data = {
        systemprofile: image === "" ? logo.profilesystem : image,
        systemname: systemname,
        newstypes: newstype,
        // lineoa: {
        //   channelID: channelID,
        //   channelAccessToken: channelaccesstoken,
        //   roleUsers: roleuser,
        // },
      };
      axios
        .post(`${process.env.REACT_APP_BE_PATH}/system/create`, data, {
          headers: {
            Authorization: "Bearer " + cookie.getJWT(),
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Create system success",
          }).then(() => {
            Router.push("/console/systems");
          });
        })
        .catch((err) => {
          console.log("error", err.response.data);
          Alert(err.response.data.message);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <div className="text-center">
        <img className="rounded-circle border" width="200px" src={image} />
      </div>
      <div className="mt-2">
        <b>System name : </b>
        {systemname}
      </div>
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
      {/* <div>
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
      </div> */}
      <div className="mt-5 d-flex justify-content-between">
        <Button danger={true} onClick={() => nextStep(1)}>
          Back
        </Button>
        <Button onClick={() => onCreateSystem()}>
          <LoadingOutlined className={`mr-1 ${loading ? "" : "d-none"}`} />
          Create system
        </Button>
      </div>
    </div>
  );
}
