import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../../../common/Button";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function AllRolePage({ role }) {
  const [rolenames] = useState(role);
  let router = useRouter();
  let { systemid, systemname } = router.query;

  const columns = [
    {
      title: "Role",
      dataIndex: "rolename",
      key: "rolename",
      align: "center",
    },
    {
      title: "Must approve",
      dataIndex: "mustapprove",
      key: "mustapprove",
      align: "center",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (text, record) => (
        <Button danger={true} onClick={() => onApprove(record.key)}>
          <DeleteOutlined />
        </Button>
      ),
      align: "center",
    },
  ];

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between pb-4">
        <h1>Role user (Line official account)</h1>
        <Link href={`/console/${systemname}/${systemid}/role/createrole`}>
          <Button>Create role</Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={rolenames} />
    </div>
  );
}
