import React from "react";
import Router, { useRouter } from "next/router";
import cookie from "../../../../../tools/cookie";
import axios from "axios";

import {
  useForm,
  Form,
  Input,
  ButtonSubmit,
  Switch,
} from "../../../../common/Form";

export default function CreateRolePage() {
  const [form] = useForm();
  const router = useRouter();
  const { systemid, systemname } = router.query;

  const onFinish = (values) => {
    const data = {
      systemid: systemid,
      rolename: values.rolename,
      require: values.require,
    };
    axios
      .post(`${process.env.REACT_APP_BE_PATH}/role/create`, data, {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(),
        },
      })
      .then((res) => {
        Router.push(`/console/${systemname}/${systemid}/role/allrole`);
      });
    console.log("Success:", values);
  };

  return (
    <div className="container pt-4">
      <h1>Create Role Page</h1>
      <Form form={form} layout={"vertical"} name="basic" onFinish={onFinish}>
        <Input
          label="Role name"
          name="rolename"
          placeholder="Role name"
          rules={[{ required: true, message: "Please input your role name!" }]}
        />
        <Switch name="require" label="Must approve" />
        <div className="d-flex justify-content-between">
          <ButtonSubmit danger={true}>Back</ButtonSubmit>
          <ButtonSubmit>Create role</ButtonSubmit>
        </div>
      </Form>
    </div>
  );
}
