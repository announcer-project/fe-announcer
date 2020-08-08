import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Switch } from "antd";
import {DeleteOutlined} from "@ant-design/icons"
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
  const [form] = Form.useForm();
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
  const [formLayout] = useState("vertical");

  useEffect(() => {
    form.setFieldsValue({
      channelid: channelID,
      channelaccesstoken: channelaccesstoken,
    });
  }, []);

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
    newRoleuser[key].require = !newRoleuser[key].require
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
      channelid !== "" &&
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

  const formItemLayout = null;
  const buttonItemLayout = null;
  return (
    <div id="FormCreateSystem">
      <span>
        <b>Connect Line Offial Account</b>
      </span>
      <div className="px-3 pt-3">
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
        >
          <Form.Item name="channelid" label="Channel ID">
            <Input
              value={channelID}
              onChange={(e) => changeChannelID(e.target.value)}
              style={{ borderRadius: "10px", height: "25px" }}
            />
          </Form.Item>
          <Form.Item
            className="mt-2"
            name="channelaccesstoken"
            label="Channel Access Token"
          >
            <Input
              value={channelaccesstoken}
              onChange={(e) => changeChannelAccessToken(e.target.value)}
              style={{ borderRadius: "10px", height: "25px" }}
            />
          </Form.Item>
          <div className="row mt-2">
            <div className="col-8 col-sm-10 pr-0">
              <Form.Item label="Role User">
                <Input
                  value={roleUserInput}
                  onChange={(e) => setRoleUserInput(e.target.value)}
                  style={{ borderRadius: "10px", height: "25px" }}
                />
              </Form.Item>
            </div>
            <div className="col-4 col-sm-2 pt-3">
              <ButtonAddNewsType
                className="px-4 pt-1 font-small"
                onClick={() => addRoleUser()}
              >
                Add
              </ButtonAddNewsType>
            </div>
          </div>
          <div>
            {roleuser.map((role, key) => {
              return (
                <div key={key} className="mt-2 d-flex justify-content-between border p-3" >
                  <div>
                    <span>{role.rolename}</span>
                  </div>
                  <div>
                    <span className="mr-3">
                      Must approve ?{" "}
                      <Switch
                        onChange={() => onRequire(key)}
                        size="small"
                        {...(role.require ? "defaultChecked" : "")}
                      />
                    </span>
                    <span>
                      <button onClick={() => deleteRoleUser(role.rolename)}><DeleteOutlined/></button>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Form>
      </div>
      <div className="mt-5 d-flex justify-content-between">
        <BackButton
          className="px-4 py-2 font-small"
          onClick={() => nextStep(1)}
        >
          Back
        </BackButton>
        <div>
          <NextButton onClick={() => onSkip()} className="px-4 py-2 font-small">
            Skip
          </NextButton>
          <NextButton
            onClick={() => onNextStep()}
            className="px-4 py-2 font-small ml-2"
          >
            Next
          </NextButton>
        </div>
      </div>
    </div>
  );
}

export default Step2;
