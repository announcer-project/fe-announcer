import Head from "next/head";
import {
  Form,
  ButtonSubmit,
  Input,
  useForm,
} from "../../../../../components/common/Form";
import Link from "next/link";
import Router from "next/router";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";
import { useEffect, useState } from "react";
import { intent as dialogflowapi } from "../../../../../api";
import styled from "styled-components";
import Button from "../../../../../components/common/Button";
import Swal from "sweetalert2";

import {
  Select,
  Form as FormAnt,
  Upload,
  message,
  Button as ButtonAnt,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

function ConnectDialogflowPage({ systemname, systemid }) {
  const [loading, setLoading] = useState(true);
  const [form] = useForm();

  useEffect(() => {}, []);

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onSubmit = async (values) => {
    let data = {
      ProjectID: values.projectid,
      AuthJSONFileBase64: await toBase64(values.file[0].originFileObj),
      Lang: values.Lang,
      TimeZone: values.TimeZone,
    };
    await dialogflowapi
      .post(`/connect?systemid=${systemid}`, data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Connect dialogflow success",
        }).then(() => {
          Router.push(`/console/${systemname}/${systemid}/bot`);
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "danger",
          title: "Connect dialogflow fail",
        }).then(() => {
          Router.push(`/console/${systemname}/${systemid}/bot`);
        });
      });
  };

  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <div className="container pt-5">
        <Form
          onFinish={onSubmit}
          form={form}
          name="connectdialogflow"
          formItemLayout={null}
        >
          <p>
            <b>For Line Official account</b>
            <br/>
            <b>Webhook URL: </b>{process.env.REACT_APP_BE_PATH}/webhook/
            {systemid}
          </p>
          <b>For Dialogflow</b>
          <Input
            label="ProjectID"
            name="projectid"
            rules={[{ required: true, message: "Please enter project ID" }]}
          />
          <FormAnt.Item
            name="Lang"
            label="Language"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="th">th</Option>
              <Option value="en">en</Option>
            </Select>
          </FormAnt.Item>
          <FormAnt.Item
            name="TimeZone"
            label="Time zone"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="Asia/Bangkok">Asia/Bangkok</Option>
            </Select>
          </FormAnt.Item>
          <FormAnt.Item
            name="file"
            label="JSON File Auth"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true }]}
          >
            <Upload name="logo" listType="picture">
              <ButtonAnt icon={<UploadOutlined />}>
                Click to upload JSON file
              </ButtonAnt>
            </Upload>
          </FormAnt.Item>
          <div className="d-flex justify-content-between">
            <Link
              href={`/console/[systemname]/[systemid]/bot?systemname=${systemname}&systemid=${systemid}`}
              as={`/console/${systemname}/${systemid}/bot`}
            >
              <a>
                <Button danger={true}>Back</Button>
              </a>
            </Link>
            <ButtonSubmit>Connect</ButtonSubmit>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
}

ConnectDialogflowPage.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
    systemid: ctx.query.systemid,
  };
};

export default withAuth(withLayout(ConnectDialogflowPage));
