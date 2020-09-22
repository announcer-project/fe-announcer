import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Layout from "../Layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../../common/Button";

import { useForm, Form, Input, ButtonSubmit } from "../../../common/Form";

export default function ConnectLinePage() {
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const onFinish = (values) => {
    setLoading(true);
    console.log("Success:", values);
    setLoading(false);
  };
  return (
    <div className="container pt-4">
      <h1>Connect Line Official Account</h1>
      <Form
        form={form}
        layout={"vertical"}
        name="basic"
        initialValues={{ remember: false }}
        onFinish={onFinish}
      >
        <Input
          label="Channel ID"
          name="channel_id"
          rules={[{ required: true, message: "Please input your username!" }]}
        />
        <Input
          label="Channel Access Token"
          name="channel_access_token"
          rules={[{ required: true, message: "Please input your username!" }]}
        />
        <div className="d-flex justify-content-between mt-5">
          <Link href={`/console/${systemid}/${systemname}/connect`}>
            <Button danger={true}>Back</Button>
          </Link>
          <ButtonSubmit>
            <LoadingOutlined className={`mr-1 ${loading ? "" : "d-none"}`} />
            Connect
          </ButtonSubmit>
        </div>
      </Form>
    </div>
  );
}
