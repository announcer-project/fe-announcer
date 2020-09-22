import React from "react";
import Layout from "../../Layout/Layout";
import { Table } from "antd";
import Button from "../../../../common/Button";

export default function RoleRequestPage() {
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Approve",
      dataIndex: "approve",
      key: "approve",
      render: () => (
        <Button danger={false} onClick={() => console.log()}>
          Approve
        </Button>
      ),
    },
    {
      title: "Reject",
      dataIndex: "reject",
      key: "reject",
      render: () => (
        <Button danger={true} onClick={() => console.log()}>
          Reject
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      userId: "John Brown",
      name: 32,
      role: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      userId: "Jim Green",
      name: 42,
      role: "London No. 1 Lake Park",
    },
    {
      key: "3",
      userId: "Joe Black",
      name: 32,
      role: "Sidney No. 1 Lake Park",
    },
  ];

  return (
    <div className="container pt-4">
      <h1>Role Request</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}