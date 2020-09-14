import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../Layouts/Layouts";
import Button from "../common/Button";

import {
  useForm,
  Form,
  Input,
  InputPassword,
  Checkbox,
  ButtonSubmit,
  TextEditor,
  UploadImage,
  UploadImages,
  Selected,
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
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({
      username: "",
      password: "",
      checked: false,
      body: "test",
      image: "",
    });
  }, []);

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
          initialValues={{ remember: false }}
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
            form={form}
            height="300px"
            label="Body"
            name="body"
            defaultValue={"test"}
            rules={[{ required: true, message: "Please input your password!" }]}
          />
          <UploadImage
            form={form}
            height="300px"
            label="Upload cover"
            name="image"
            defaultValue={""}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            Upload cover
          </UploadImage>
          <UploadImages
            form={form}
            // height="300px"
            label="Upload cover"
            name="images"
            defaultValue={[]}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            Upload cover
          </UploadImages>
          <Selected
            form={form}
            label="Upload cover"
            name="newstypes"
            defaultValue={[
              { id: 0, name: "Update System", selected: false },
              { id: 1, name: "New Release", selected: false },
            ]}
            rules={[{ required: true, message: "Please input your password!" }]}
          />

          <ButtonSubmit danger={true}>Back</ButtonSubmit>
          <ButtonSubmit>test</ButtonSubmit>
        </Form>
      </div>
    </Layout>
  );
}
