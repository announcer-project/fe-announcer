import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Button from "../../../common/Button";
import { PlusOutlined } from "@ant-design/icons";
import cookie from "../../../../tools/cookie";

export default function SettingAdminPage(props) {
  let [isAdmin, setIsAdmin] = useState(false);
  let [user, setUser] = useState(props.user);

  useEffect(() => {
    if (props.admins[0].userId === user.ID) {
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

  const data = props.admins;

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between">
        <h1>Setting admin</h1>
        <Button>
          <PlusOutlined className="mr-1 anticon" />
          Add admin
        </Button>
      </div>
      <Table className="mt-4" columns={columns} dataSource={data} />
    </div>
  );
}
