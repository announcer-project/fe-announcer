import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../../../common/Button";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { rolewithjwt as roleapi } from "../../../../../api";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";

export default function AllRolePage() {
  const [rolenames, setRoles] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const onDeleteRole = (roleid) => {
    Swal.fire({
      title: "You want to delete this role?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        roleapi
          .delete(`/${systemid}/${roleid}`)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Delete success",
              showConfirmButton: true,
              timer: 3000,
            }).then(() => {
              fetchRole();
              setLoading(true);
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Delete fail",
              showConfirmButton: true,
              timer: 3000,
            }).then(() => {
              setLoading(true);
            });
          });
      }
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
        <Button danger={true} onClick={() => onDeleteRole(record.ID)}>
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
