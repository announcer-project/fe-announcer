import React from "react";
import Link from "next/link";
import Layout from "../Layouts/Layouts";
import Button from "../common/Button";

import {
  Form,
  Input,
  InputPassword,
  Checkbox,
  ButtonSubmit,
  TextEditor,
} from "../common/Form";

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

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
          layout={"vertical"}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Input
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          />

          <InputPassword
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          />

          <Checkbox name="remember" valuePropName="checked">
            Remember me
          </Checkbox>
          <TextEditor
          height="300px"
            label="Body"
            name="body"
            rules={[{ required: true, message: "Please input your password!" }]}
          />

          <ButtonSubmit danger={true}>Back</ButtonSubmit>
          <ButtonSubmit>test</ButtonSubmit>
        </Form>
      </div>
    </Layout>
  );
}
