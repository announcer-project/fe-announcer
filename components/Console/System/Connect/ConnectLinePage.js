import React, { useState } from "react";
import { LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Button from "../../../common/Button";
import Swal from "sweetalert2";
import axios from "axios";
import cookie from "../../../../tools/cookie";

import {
  useForm,
  Form,
  Input,
  ButtonSubmit,
  Switch,
} from "../../../common/Form";

export default function ConnectLinePage() {
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const [roleInput, setRoleInput] = useState("");
  const [channelid, setChannelid] = useState("");
  const [liffid, setLiffid] = useState("");
  const [accesstoken, setAccessToken] = useState("");
  const [roles, setRoles] = useState([]);

  const addRole = () => {
    if (
      roleInput !== "" &&
      roleInput !== " " &&
      roleInput.substring(0, 1) !== " "
    ) {
      let newroles = roles;
      newroles.push({
        rolename: roleInput,
        require: false,
      });
      setRoles(newroles);
      setRoleInput("");
    }
  };

  const deleteRole = (rolename) => {
    let newroles = roles;
    newroles = newroles.filter((role) => {
      return role.rolename !== rolename;
    });
    setRoles(newroles);
  };

  const onRequire = (key) => {
    roles[key].require = !roles[key].require;
    setRoles([...roles]);
  };

  const Alert = (text) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });
  };

  const onFinish = async (values) => {
    if (
      channelid !== "" &&
      liffid !== "" &&
      accesstoken !== "" &&
      roles.length !== 0
    ) {
      setLoading(true);
      console.log("Success:", values);
      console.log("roles", roles);
      let data = {
        systemid: systemid,
        channelid: channelid,
        channelaccesstoken: accesstoken,
        roles: roles,
        liffid: liffid,
      };
      await axios
        .post(`${process.env.REACT_APP_BE_PATH}/connect/line`, data, {
          headers: {
            Authorization: "Bearer " + cookie.getJWT(),
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Connect success",
          }).then(() => {
            console.log(res.data);
            Router.push(
              `/console/systemname=${systemname}/systemid=${systemid}/connect`,
              `/console/${systemname}/${systemid}/connect`
            );
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Connect line account fail"
          })
          setLoading(false);
        });
    } else {
      if (channelid === "") {
        Alert("Please enter channel ID");
      } else if (accesstoken === "") {
        Alert("Please enter channel ID");
      } else if (liffid === "") {
        Alert("Please enter LIFF ID");
      } else if (roles.length === 0) {
        Alert("Please enter channel ID");
      }
    }
  };

  return (
    <div className="container pt-4">
      <h1>Connect Line Official Account</h1>
      <div className="mt-4">
        <Form
          form={form}
          layout={"vertical"}
          name="basic"
          initialValues={{ remember: false }}
        >
          <div>
            <b>For Line Login</b>
            <p style={{ color: "rgba(0, 0, 0, 0.65)" }}>
              Endpoint URL: https://announcer-system.com/line/{systemid}
            </p>
            <p>
              <span className="text-danger">*</span> LIFF ID
            </p>
            <Input value={liffid} onChange={(e) => setLiffid(e.target.value)} />
          </div>
          <div>
            <b>For Line Messaging API</b>
            <p>
              <span className="text-danger">*</span> Channel ID
            </p>
            <Input
              value={channelid}
              onChange={(e) => setChannelid(e.target.value)}
            />
            <p>
              <span className="text-danger">*</span> Channel Access Token
            </p>
            <Input
              value={accesstoken}
              onChange={(e) => setAccessToken(e.target.value)}
            />
            <div className="row pt-2">
              <p>
                <span className="text-danger">*</span> Add role of users in line
              </p>
              <div className="col-8 col-xs-9 col-lg-10 pr-0">
                <Input
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                />
              </div>
              <div className="col-4 col-xs-3 col-lg-2">
                <Button
                  style={{ width: "100%" }}
                  className="py-1"
                  onClick={() => addRole()}
                >
                  Add
                </Button>
              </div>
              <div>
                {roles.map((role, key) => {
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
                          onClick={() => deleteRole(role.rolename)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-5">
            <Link href={`/console/${systemname}/${systemid}/connect`}>
              <Button danger={true}>Back</Button>
            </Link>
            <ButtonSubmit onClick={onFinish}>
              <LoadingOutlined className={`mr-1 ${loading ? "" : "d-none"}`} />
              Connect
            </ButtonSubmit>
          </div>
        </Form>
      </div>
    </div>
  );
}
