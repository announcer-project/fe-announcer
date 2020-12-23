import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Button from "../../../../common/Button";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2"

export default function RoleRequestPage() {
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    fetchRoleRequest();
  }, []);

  const onApprove = async (memberid) => {
    Swal.fire({
      title: "Do you want to approve this member?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async(result) => {
      if (result.value) {
        let data = {
          memberid: memberid,
          systemid: systemid,
        };
        await axios
          .put(`${process.env.REACT_APP_BE_PATH}/role/request/approve`, data, {
            headers: {
              Authorization: "Bearer " + cookie.getJWT(),
            },
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Approve member success",
              showConfirmButton: true,
              timer: 3000,
            }).then(() => {
              fetchRoleRequest();
            });
          });
      }
    });
  };

  const onReject = async (memberid) => {
    Swal.fire({
      title: "Do you want to reject this member?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async(result) => {
      if (result.value) {
        let data = {
          memberid: memberid,
          systemid: systemid,
        };
        await axios
          .delete(`${process.env.REACT_APP_BE_PATH}/role/request/reject`, {
            headers: {
              Authorization: "Bearer " + cookie.getJWT(),
            },
            data,
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Reject member success",
              showConfirmButton: true,
              timer: 3000,
            }).then(() => {
              fetchRoleRequest();
            });
          });
      }
    });
  };

  const fetchRoleRequest = async () => {
    await axios
      .get(`${process.env.REACT_APP_BE_PATH}/role/request/${systemid}`, {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(),
        },
      })
      .then((res) => {
        if (res.data === null) {
          setRequests([]);
        } else {
          setRequests(res.data);
        }
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Approve",
      dataIndex: "approve",
      key: "approve",
      render: (text, record) => (
        <Button onClick={() => onApprove(record.key)}>Approve</Button>
      ),
    },
    {
      title: "Reject",
      dataIndex: "reject",
      key: "reject",
      render: (text, record) => (
        <Button danger={true} onClick={() => onReject(record.key)}>
          Reject
        </Button>
      ),
    },
  ];

  return (
    <div className="container pt-4">
      <h1>Role Request</h1>
      {requests ? (
        <Table columns={columns} dataSource={requests} />
      ) : (
          <Skeleton height={300} />
        )}
    </div>
  );
}
