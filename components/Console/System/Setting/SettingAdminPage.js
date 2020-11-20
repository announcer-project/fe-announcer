import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import Button from "../../../common/Button";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import cookie from "../../../../tools/cookie";
import axios from "axios";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { admin as adminapi } from "../../../../api";
import Swal from "sweetalert2";

import { useForm, Form, Input, ButtonSubmit } from "../../../common/Form";

export default function SettingAdminPage() {
  let [isAdmin, setIsAdmin] = useState(false);
  let [user, setUser] = useState(null);
  let [admins, setAdmins] = useState(null);

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [form] = useForm();
  const [visible, setVisible] = useState();
  const [loading, setLoading] = useState();

  const router = useRouter();
  const { systemid } = router.query;

  useEffect(() => {
    fetchAllAdmin();
  }, []);

  const fetchAllAdmin = async () => {
    await axios
      .get(`${process.env.REACT_APP_BE_PATH}/admin/${systemid}`, {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(),
        },
      })
      .then(async (res) => {
        let adminsdb = res.data;
        setAdmins(adminsdb);
        await axios
          .get(`${process.env.REACT_APP_BE_PATH}/user`, {
            headers: {
              Authorization: "Bearer " + cookie.getJWT(),
            },
          })
          .then((res) => {
            let userdb = res.data;
            if (adminsdb[0].userId === userdb.ID) {
              setIsAdmin(true);
              setUser(userdb);
            }
          });
      });
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (text, record) => {
        console.log(record.userId);
        if (isAdmin) {
          if (user.ID !== record.userId) {
            return (
              <Button onClick={() => console.log(record.key)}>Edit</Button>
            );
          }
        }
        return <div></div>;
      },
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (text, record) => {
        if (user.ID === record.userId) {
          if (!isAdmin) {
            return (
              <Button danger={true} onClick={() => console.log(record.key)}>
                Leave
              </Button>
            );
          } else {
            return <div />;
          }
        } else {
          return <div />;
        }
      },
    },
  ];

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onAddCoAdmin = (values) => {
    console.log(values);
    let data = {
      UserID: values.admin,
    };
    adminapi
      .post(`/create?systemid=${systemid}`, data)
      .then((res) => {
        console.log(res.data);
        Swal.fire("Success!", "Your add co-admin success.", "success").then(() => {
          form.setFieldsValue({
            admin: ""
          })
          fetchAllAdmin();
          setVisible(false)
        })
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User ID incorrect.',
        })
      });
  };

  const data = admins;

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between">
        <h1>Setting admin</h1>
        <Button onClick={showModal}>
          <PlusOutlined className="mr-1 anticon" />
          Add admin
        </Button>
      </div>
      {admins && user ? (
        <>
          <Table className="mt-4" columns={columns} dataSource={data} />
          <Modal
            visible={visible}
            title="Add admin"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              form={form}
              layout={"vertical"}
              name="basic"
              onFinish={onAddCoAdmin}
            >
              <Input
                name="admin"
                rules={[{ required: true, message: "Please input user ID" }]}
              />
              <div className="text-center">
                <ButtonSubmit className="mx-auto">
                  <LoadingOutlined
                    className={`${loadingCreate ? "" : "d-none"} mr-1`}
                  />
                  Add
                </ButtonSubmit>
              </div>
            </Form>
          </Modal>
        </>
      ) : (
        <Skeleton height={300} />
      )}
    </div>
  );
}
