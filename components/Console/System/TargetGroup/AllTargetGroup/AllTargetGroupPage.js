import React, { useState } from "react";
import cookie from "../../../../../tools/cookie";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "../../../../common/Button";
import { Table } from "antd";

export default function AllTargetGroupPage(props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const path = `/console/${systemname}/${systemid}`;
  const [targetgroups, setTargetgroups] = useState(props.targetGroups);
  const [selected, setSelected] = useState(0);

  const fetchTargetgroups = async () => {
    await axios
      .get(`${process.env.REACT_APP_BE_PATH}/targetgroup/${systemid}/all`, {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(),
        },
      })
      .then((res) => {
        setTargetgroups(res.data);
      });
  };

  const Delete = async (targetgroupid) => {
    if (!loading) {
      setLoading(true);
      setSelected(targetgroupid);
      await axios
        .delete(
          `${process.env.REACT_APP_BE_PATH}/targetgroup/${systemid}/${targetgroupid}`,
          {
            headers: {
              Authorization: "Bearer " + cookie.getJWT(),
            },
          }
        )
        .then((res) => {
          fetchTargetgroups();
          setLoading(false);
          setSelected(0);
        });
    }
  };

  const columns = [
    {
      title: "Target group",
      dataIndex: "targetgroup_name",
      key: "targetgroup_name",
      align: "center",
    },
    {
      title: "People",
      dataIndex: "number_members",
      key: "number_members",
      align: "center",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (text, record) => (
        <Button danger={true} onClick={() => Delete(record.ID)}>
          <LoadingOutlined
            className={`${selected === record.ID && loading ? "" : "d-none"}`}
          />
          <DeleteOutlined
            className={`${selected === record.ID && loading ? "d-none" : ""}`}
          />
        </Button>
      ),
      align: "center",
    },
  ];

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between pb-4">
        <h1>All target group</h1>
        <Link
          href={`/console/${systemname}/${systemid}/targetgroup/createtargetgroup`}
        >
          <Button>Create target group</Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={targetgroups} />
    </div>
  );
}
