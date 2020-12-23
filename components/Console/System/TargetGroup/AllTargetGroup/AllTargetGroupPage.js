import React, { useState, useEffect } from "react";
import cookie from "../../../../../tools/cookie";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "../../../../common/Button";
import { Table } from "antd";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";

export default function AllTargetGroupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const [targetgroups, setTargetgroups] = useState(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    fetchTargetgroups();
  }, []);

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
      Swal.fire({
        title: "You want to delete this target group?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
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
              Swal.fire({
                icon: "success",
                title: "Delete success",
              });
              fetchTargetgroups();
              setLoading(false);
              setSelected(0);
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops!",
                text: error.response.data.message
              });
              setLoading(false);
              setSelected(0);
            });
        } else {
          setLoading(false);
        }
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
          href={`/console/[systemname]/[systemid]/targetgroup/createtargetgroup?systemname=${systemname}&systemid=${systemid}`}
          as={`/console/${systemname}/${systemid}/targetgroup/createtargetgroup`}
        >
          <Button>Create target group</Button>
        </Link>
      </div>
      {targetgroups ? (
        <Table columns={columns} dataSource={targetgroups} />
      ) : (
          <Skeleton height={200} />
        )}
    </div>
  );
}