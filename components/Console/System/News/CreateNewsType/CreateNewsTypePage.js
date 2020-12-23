import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import cookie from "../../../../../tools/cookie";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import Button from "../../../../common/Button";
import { Table, Modal } from "antd";
import Skeleton from "react-loading-skeleton";

import { useForm, Form, Input, ButtonSubmit } from "../../../../common/Form";

export default function CreateNewsTypePage() {
  const [newstypes, setNewstypes] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [selected, setSelected] = useState(0);
  let router = useRouter();
  let { systemname, systemid } = router.query;
  const [form] = useForm();
  const [visible, setVisible] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    GetNewsTypes();
  }, []);

  const GetNewsTypes = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BE_PATH}/news/newstype/all?systemid=${systemid}`,
        {
          headers: {
            Authorization: "Bearer " + cookie.getJWT(),
          },
        }
      )
      .then((res) => {
        setNewstypes(res.data);
      });
  };

  const addNewsType = async (values) => {
    if (!loadingCreate || !loadingDelete) {
      if (values.newstype !== "") {
        if (values.newstype.charAt(0) !== " ") {
          setLoadingCreate(true);
          let { systemid } = router.query;
          let data = {
            systemid: systemid,
            newstypename: values.newstype,
          };
          await axios
            .post(
              `${process.env.REACT_APP_BE_PATH}/news/newstype/create`,
              data,
              {
                headers: {
                  Authorization: "Bearer " + cookie.getJWT(),
                },
              }
            )
            .then((res) => {
              GetNewsTypes();
              form.setFieldsValue({
                newstype: "",
              });
              setLoadingCreate(false);
              setLoading(true);
              setLoading(false);
              setVisible(false);
            }).catch(err => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.message,
              });
              setLoadingCreate(false);
            })
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please delete space from first text",
          });
          setLoadingCreate(false);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter news type name",
        });
      }
    }
  };

  const Delete = (newstypeid) => {
    if (!loadingDelete || !loadingCreate) {
      setLoadingDelete(true);
      setSelected(newstypeid);
      let data = {
        systemid: systemid,
        newstypeid: newstypeid,
      };
      Swal.fire({
        title: "You want to delete this news type ?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          axios
            .post(
              `${process.env.REACT_APP_BE_PATH}/news/newstype/delete`,
              data,
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
                showConfirmButton: true,
                timer: 3000,
              }).then(() => {
                GetNewsTypes();
                setSelected(0);
                setLoadingDelete(false);
              });
            });
        } else {
          setLoadingDelete(false);
        }
      });
    }
  };

  const columns = [
    {
      title: "News type",
      dataIndex: "newstype_name",
      key: "newstype_name",
      align: "center",
    },
    {
      title: "Number of news",
      dataIndex: "number_news",
      key: "number_news",
      align: "center",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (text, record) => (
        <Button danger={true} onClick={() => Delete(record.ID)}>
          <LoadingOutlined
            className={`${record.ID === selected && loadingDelete ? "" : "d-none"
              }`}
          />
          <DeleteOutlined
            className={`${record.ID === selected && loadingDelete ? "d-none" : ""
              }`}
          />
        </Button>
      ),
      align: "center",
    },
  ];

  const data = newstypes;

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between pb-4">
        <h1>Create news type</h1>
        <Button onClick={showModal}>Create news type</Button>
      </div>
      {newstypes ? (
        <>
          <Table columns={columns} dataSource={data} />
          <Modal
            visible={visible}
            title="Create news type"
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              form={form}
              layout={"vertical"}
              name="basic"
              onFinish={addNewsType}
            >
              <Input
                name="newstype"
                label="News type name"
                rules={[{ required: true, message: "Please input news type name" }]}
              />
              <div className="text-center">
                <ButtonSubmit>
                  <LoadingOutlined
                    className={`${loadingCreate ? "" : "d-none"} mr-1`}
                  />
                  Create
                </ButtonSubmit>
              </div>
            </Form>
          </Modal>
        </>
      ) : (
          <Skeleton height={200} />
        )}
    </div>
  );
}
