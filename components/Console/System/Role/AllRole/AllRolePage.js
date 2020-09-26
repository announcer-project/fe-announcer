import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../../../common/Button";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
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
      <Button danger={true} onClick={() => onApprove(record.key)}><DeleteOutlined /></Button>
    ),
    align: "center",
  },
];

const data = [
  {
    key: '1',
    role: 'John Brown',
    mustapprove: 32,
  },
  {
    key: '2',
    role: 'Jim Green',
    mustapprove: 42,
  },
  {
    key: '3',
    role: 'Joe Black',
    mustapprove: 32,
  },
];

export default function AllRolePage(props) {
  const [rolenames] = useState(props.role);
  let router = useRouter();
  let { systemid, systemname } = router.query;

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between pb-4">
        <h1>Role user (Line official account)</h1>
        <Link href={`/console/${systemname}/${systemid}/role/createrole`}>
          <Button>Create role</Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
