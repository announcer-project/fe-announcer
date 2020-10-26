import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../../../common/Button";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

export default function AllRolePage() {
  const [rolenames, setRoles] = useState(null);
  let router = useRouter();
  let { systemid, systemname } = router.query;

  useEffect(() => {
    fetchRole();
  }, []);

  const fetchRole = () => {
    let roles = [];
    axios
      .get(`${process.env.REACT_APP_BE_PATH}/role/all?systemid=${systemid}`)
      .then((res) => {
        roles = res.data;
      })
      .then(() => {
        let newRoles = [];
        roles.forEach((role) => {
          let approve = "";
          if (role.require) {
            approve = "Must approve";
          }
          newRoles.push({ ...role, mustapprove: approve });
        });
        setRoles(newRoles);
      });
  };

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
        <Link
          href={`/console/[systemname]/[systemid]/role/createrole?systemname=${systemname}&systemid=${systemid}`}
          as={`/console/${systemname}/${systemid}/role/createrole`}
        >
          <Button>Create role</Button>
        </Link>
      </div>
      {rolenames ? (
        <Table columns={columns} dataSource={rolenames} />
      ) : (
        <div>
          <Skeleton height={300} />
        </div>
      )}
    </div>
  );
}
