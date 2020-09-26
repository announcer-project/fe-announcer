import React, { useState } from "react";
import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../Layout/Layout";
import Button from "../../../../common/Button";
import { Table } from "antd";

const BoxCreateTargetGroup = styled.div`
  height: 145px;
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  padding-top: 60px;
`;

export default function AllTargetGroupPage(props) {
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const path = `/console/${systemname}/${systemid}`;
  const targetgroups = props.targetGroups;

  const columns = [
    {
      title: "Target group",
      dataIndex: "targetgroup",
      key: "targetgroup",
      align: "center",
    },
    {
      title: "People",
      dataIndex: "people",
      key: "people",
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
      targetgroup: 'John Brown',
      people: 32,
    },
    {
      key: '2',
      targetgroup: 'Jim Green',
      people: 42,
    },
    {
      key: '3',
      targetgroup: 'Joe Black',
      people: 32,
    },
  ];

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between pb-4">
        <h1>All target group</h1>
        <Button>Create role</Button>
      </div>
        <Table columns={columns} dataSource={data} />
    </div>
  );
}
