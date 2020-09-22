import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Switch } from "../../common/Form";
import Button from "../../common/Button";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Swal from "sweetalert2";
import { CreatesystemContext } from "../../../store/CreatesystemProvider";
import { NewsTypeBox, Cancel, NextButton, BackButton } from "./Components";
import next from "next";

const ButtonAddNewsType = styled.div`
  background-color: #050042;
  border: none;
  border-radius: 50px;
  color: white;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  margin-top: 10px;
  height: 25px;
`;

function Step2() {
  const [roleUserInput, setRoleUserInput] = useState("");
  const {
    channelID,
    channelaccesstoken,
    roleuser,
    changeChannelID,
    changeChannelAccessToken,
    changeRoleUser,
    nextStep,
  } = useContext(CreatesystemContext);

  useEffect(() => {}, []);

  const addRoleUser = () => {
    let newRoleuser = roleuser;
    newRoleuser.push({
      rolename: roleUserInput,
      require: false,
    });
    changeRoleUser(newRoleuser);
    setRoleUserInput("");
  };

  const deleteRoleUser = (rolename) => {
    let newRoleuser = roleuser;
    newRoleuser = newRoleuser.filter((role) => {
      return role.rolename !== rolename;
    });
    changeRoleUser(newRoleuser);
  };

  const onRequire = (key) => {
    let newRoleuser = roleuser;
    newRoleuser[key].require = !newRoleuser[key].require;
    changeRoleUser(newRoleuser);
  };

  const Alert = (text) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });
  };

  const onSkip = () => {
    changeChannelID("");
    changeChannelAccessToken("");
    changeRoleUser([]);
    nextStep(3);
  };

  const onNextStep = () => {
    if (
      channelID !== "" &&
      channelaccesstoken !== "" &&
      roleuser.length !== 0
    ) {
      nextStep(3);
    } else {
      if (channelid === "") {
        Alert("Please enter channel ID");
      } else if (channelaccesstoken === "") {
        Alert("Please enter channel access token");
      } else {
        Alert("Please enter role user at least 1");
      }
    }
  };

  return (
    <div>
      <h2>
        <b>Connect Line Offial Account</b>
      </h2>
      <div className="px-3 pt-3">
        <Form>
          <p>Channel ID</p>
          <Input
            value={channelID}
            onChange={(e) => changeChannelID(e.target.value)}
          />
          <p>Channel Access Token</p>
          <Input
            value={channelaccesstoken}
            onChange={(e) => changeChannelAccessToken(e.target.value)}
          />
          <div className="row pt-2">
            <p>Add role</p>
            <div className="col-8 col-xs-9 col-lg-10 pr-0">
              <Input
                value={roleUserInput}
                onChange={(e) => setRoleUserInput(e.target.value)}
              />
            </div>
            <div className="col-4 col-xs-3 col-lg-2">
              <Button
                style={{ width: "100%" }}
                className="py-1"
                onClick={() => addRoleUser()}
              >
                Add
              </Button>
            </div>
            <div>
              {roleuser.map((role, key) => {
                return (
                  <div
                    key={key}
                    className="mt-2 d-flex justify-content-between border p-3"
                  >
                    <div>
                      <span>{role.rolename}</span>
                    </div>
                    <div>
                      <span>Must approve ? </span>
                      {role.require ? (
                        <Switch
                          className="mb-0 ml-1 mr-3 d-inline-block "
                          onChange={() => onRequire(key)}
                          size="small"
                          defaultChecked
                        />
                      ) : (
                        <Switch
                          className="mb-0 ml-1 mr-3 d-inline-block "
                          onChange={() => onRequire(key)}
                          size="small"
                        />
                      )}
                      <Button
                        danger={true}
                        onClick={() => deleteRoleUser(role.rolename)}
                      >
                        <DeleteOutlined />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Form>
      </div>
      <div className="mt-5 d-flex justify-content-between">
        <Button danger={true} onClick={() => nextStep(1)}>
          Back
        </Button>
        <div>
          <Button className="mr-2" onClick={() => onSkip()}>
            Skip
          </Button>
          <Button onClick={() => onNextStep()}>Next</Button>
        </div>
      </div>
    </div>
  );
}

export default Step2;
