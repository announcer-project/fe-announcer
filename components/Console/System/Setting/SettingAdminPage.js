import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import Button from "../../../common/Button";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import cookie from "../../../../tools/cookie";

import { useForm, Form, Input, ButtonSubmit } from "../../../common/Form";


export default function SettingAdminPage({admins, userdb}) {
  let [isAdmin, setIsAdmin] = useState(false);
  let [user, setUser] = useState(userdb);

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [form] = useForm();
  const [visible, setVisible] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (admins[0].userId === user.ID) {
      setIsAdmin(true);
    }
  });

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
    setVisible(true)
  };

  const handleOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setVisible(false)
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false)
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
          // onFinish={addNewsType}
        >
          <Input className="mt-2" name="admin" />
          <ButtonSubmit>
            <LoadingOutlined
              className={`${loadingCreate ? "" : "d-none"} mr-1`}
            />
                  Add
                </ButtonSubmit>
        </Form>
      </Modal>
    </div>
  );
}
