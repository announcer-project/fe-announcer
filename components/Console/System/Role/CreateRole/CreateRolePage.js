import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import cookie from "../../../../../tools/cookie";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import Button from "../../../../common/Button";
import Swal from "sweetalert2"

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
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    if (!loading) {
      setLoading(true);
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
          Swal.fire({
            icon: "success",
            title: "Create role success",
          }).then(_=>{
            Router.push(`/console/${systemname}/${systemid}/role/allrole`);
          })
        }).catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
          }).then(_=> {
            setLoading(false)
          })
        })
    }
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
          <Link
            href={`/console/[systemname]/[systemid]/role/allrole?systemname=${systemname}&systemid=${systemid}`}
            as={`/console/${systemname}/${systemid}/role/allrole`}
          >
            <Button danger={true}>Back</Button>
          </Link>
          <ButtonSubmit>
            <LoadingOutlined className={`mr-1 ${loading ? "" : "d-none"}`} />
            Create role
          </ButtonSubmit>
        </div>
      </Form>
    </div>
  );
}
