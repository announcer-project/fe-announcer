import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../Layouts/Layouts";
import Button from "../common/Button";
import { Form as FormAnt } from "antd";

import {
  Form,
  Input,
  InputPassword,
  Checkbox,
  ButtonSubmit,
  TextEditor,
} from "../common/Form";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function Home(props) {
  const SetCookie = () => {
    document.cookie = `test=sfafdsfsdf; path=/`;
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, check] = useState(false);
  const [body, setBody] = useState("");
  const [form] = FormAnt.useForm();
  useEffect(() => {
    form.setFieldsValue({
      username: username,
      password: password,
      checked: checked,
      body: body,
    });
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      body: body,
    });
  }, [body]);
  return (
    <Layout {...props}>
      <div>Hello, next.js</div>
      <Link href="/login">
        <button type="button" className="btn btn-success">
          Console
        </button>
      </Link>
      <Link href="/console/systems">
        <button type="button" className="btn btn-success">
          Systems
        </button>
      </Link>
      <button onClick={SetCookie}>Set</button>
      <Button>test</Button>
      <div>
        <Form
          form={form}
          layout={"vertical"}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Input
            label="Username"
            name="username"
            value={username}
            setValue={setUsername}
            rules={[{ required: true, message: "Please input your username!" }]}
          />
          <InputPassword
            label="Password"
            name="password"
            value={password}
            setPassword={setPassword}
            rules={[{ required: true, message: "Please input your password!" }]}
          />
          <Checkbox name="remember" valuePropName="checked">
            Remember me
          </Checkbox>
          <TextEditor
            height="300px"
            label="Body"
            name="body"
            body={body}
            onChangeBody={setBody}
            rules={[{ required: true, message: "Please input your password!" }]}
          />

          <ButtonSubmit danger={true}>Back</ButtonSubmit>
          <ButtonSubmit>test</ButtonSubmit>
        </Form>
      </div>
    </Layout>
  );
}
