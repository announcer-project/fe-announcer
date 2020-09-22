import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import cookie from "../../../../../tools/cookie";
import { LoadingOutlined } from "@ant-design/icons";
import Button from "../../../../common/Button";

import { useForm, Form, Input, ButtonSubmit } from "../../../../common/Form";

const Box = styled.div`
  height: 145px;
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  padding-top: 40px;
`;
const BoxAddNewsType = styled.div`
  height: 145px;
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
`;
const ButtonAddNewsType = styled.div`
  background-color: #050042;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  width: 77px;
  margin-top: 10px;
`;

export default function CreateNewsTypePage(props) {
  const [newstypes, setNewstypes] = useState(props.newsTypes);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [selected, setSelected] = useState(0);
  let router = useRouter();
  const [form] = useForm();

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

  return (
    <div className="container pt-4">
      <h1>Create news type</h1>
      <div className="col-12">
        <div className="row">
          <div className="col-3 p-2">
            <BoxAddNewsType className="shadow-sm pt-3 px-3">
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
            </BoxAddNewsType>
          </div>
          {newstypes.map((newstype) => {
            return (
              <div className="col-3 p-2">
                <Box className="shadow-sm">
                  {newstype.newstype_name}
                  <br />
                  <Button
                    className={`mt-3 `}
                    danger={true}
                    onClick={() => Delete(newstype.ID)}
                  >
                    <LoadingOutlined
                      className={`${
                        loadingDelete && selected === newstype.ID
                          ? ""
                          : "d-none"
                      } mr-1`}
                    />
                    Delete
                  </Button>
                </Box>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
