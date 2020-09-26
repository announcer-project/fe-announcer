import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import cookie from "../../../../../tools/cookie";
import { DeleteOutlined, LoadingOutlined} from "@ant-design/icons";
import Button from "../../../../common/Button";
import { Table, Modal } from "antd";

import { useForm, Form, Input, ButtonSubmit } from "../../../../common/Form";

export default function CreateNewsTypePage(props) {
  const [newstypes, setNewstypes] = useState(props.newsTypes);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [selected, setSelected] = useState(0);
  let router = useRouter();
  const [form] = useForm();
  const [visible, setVisible] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    form.setFieldsValue({
      newstype: "",
    });
  }, []);

  const GetNewsTypes = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BE_PATH}/news/newstype/all?systemid=${props.query.systemid}`,
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
            });
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
      let { systemid } = router.query;
      let data = {
        systemid: systemid,
        newstypeid: newstypeid,
      };
      axios
        .post(`${process.env.REACT_APP_BE_PATH}/news/newstype/delete`, data, {
          headers: {
            Authorization: "Bearer " + cookie.getJWT(),
          },
        })
        .then((res) => {
          GetNewsTypes();
          setSelected(0);
          setLoadingDelete(false);
        });
    }
  };


  const columns = [
    {
      title: "News type",
      dataIndex: "newstype",
      key: "newstype",
      align: "center",
    },
    {
      title: "Number of news",
      dataIndex: "numofnews",
      key: "numofnews",
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
      newstype: 'John Brown',
      numofnews: 32,
    },
    {
      key: '2',
      newstype: 'Jim Green',
      numofnews: 42,
    },
    {
      key: '3',
      newstype: 'Joe Black',
      numofnews: 32,
    },
  ];

  const showModal = () => {
    setVisible(true)
  };

  const handleOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setVisible(false)
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false)
  };


  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between pb-4">
        <h1>Create news type</h1>
        <Button onClick={showModal}>Create news type</Button>
      </div>
      <Table columns={columns} dataSource={data} />
      <Modal
        visible={visible}
        title="Create news type"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout={"vertical"}
          name="basic"
          onFinish={addNewsType}
        >
          <span>Add news type</span>
          <Input className="mt-2" name="newstype" />
          <ButtonSubmit>
            <LoadingOutlined
              className={`${loadingCreate ? "" : "d-none"} mr-1`}
            />
                  Create
                </ButtonSubmit>
        </Form>
      </Modal>

    </div>
  );
}
