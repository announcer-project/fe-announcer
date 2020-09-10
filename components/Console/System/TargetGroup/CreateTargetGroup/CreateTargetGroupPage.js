import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Router from "next/router";
// import { Input } from "antd";
import Swal from "sweetalert2";
import cookie from "../../../../../tools/cookie";
// import { Form as FormAnt } from "antd";
import { useForm, Form, Input, ButtonSubmit } from "../../../../common/Form";

import Layout from "../../Layout/Layout";

const ButtonCreateTargetGroup = styled.div`
  background-color: #050042;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  width: 77px;
  margin-top: 10px;
`;

export default function CreateTargetGroupPage(props) {
  const [targetgroup, setTargetgroup] = useState("");
  const path = `/console/${props.query.systemname}/${props.query.systemid}`;
  let [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      targetgroup: "",
    });
  }, []);

  const AddTargetGroup = (values) => {
    console.log(values)
    // if (targetgroup !== "") {
    //   if (targetgroup.charAt(0) !== " ") {
    //     let data = new FormData();
    //     data.append("systemid", props.query.systemid);
    //     data.append("targetgroupname", targetgroup);
    //     axios
    //       .post(`${process.env.REACT_APP_BE_PATH}/targetgroup/create`, data, {
    //         headers: {
    //           Authorization: "Bearer " + cookie.getJWT(),
    //         },
    //       })
    //       .then((res) => {
    //         Router.push(`${path}/targetgroup/alltargetgroup`);
    //       });
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Please delete space from first text",
    //     });
    //   }
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Please enter target group name",
    //   });
    // }
  };

  return (
    <Layout {...props}>
      <div className="container pt-4">
        <h1>Create target group</h1>
        <Form
          form={form}
          layout={"vertical"}
          name="basic"
          onFinish={AddTargetGroup}
          // onFinishFailed={onFinishFailed}
        >
          <Input label="Target group name" name="targetgroup" />
          <ButtonSubmit>Create</ButtonSubmit>
        </Form>
        {/* <Input
          onChange={(e) => setTargetgroup(e.target.value)}
          value={targetgroup}
          placeholder="Group name"
        />
        <ButtonCreateTargetGroup onClick={AddTargetGroup} type="button">
          Create
        </ButtonCreateTargetGroup> */}
      </div>
    </Layout>
  );
}
