import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Upload } from "antd";
import { LoadingOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Swal from "sweetalert2";
import { CreatesystemContext } from "../../../store/CreatesystemProvider";
import { NewsTypeBox, Cancel, NextButton } from "./Components";

import "./Upload.module.css"

const ButtonAddNewsType = styled.div`
  background-color: #050042;
  border: none;
  border-radius: 50px;
  color: white;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  margin-top: 10px;
  height: 25px;
`;

const Profile = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 150px;
  border: 1px solid #050042;
`;

function Step1() {
  const [form] = Form.useForm();
  const [newstypeInput, setNewstypeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    image,
    changeImage,
    systemname,
    changeSystemname,
    newstype,
    changeNewstype,
    changeRoleUser,
    nextStep,
  } = useContext(CreatesystemContext);
  const [formLayout] = useState("vertical");

  useEffect(() => {
    form.setFieldsValue({
      systemname: systemname,
    });
    if (systemname === "") {
      changeNewstype([]);
      changeRoleUser([]);
    }
  }, []);

  const addNewstype = () => {
    let newnewstype = newstype;
    newnewstype.push(newstypeInput);
    changeNewstype(newnewstype);
    setNewstypeInput("");
  };

  const deleteNewstype = (newstypename) => {
    let newnewstype = newstype;
    newnewstype = newnewstype.filter((newstype) => {
      return newstype !== newstypename;
    });
    changeNewstype(newnewstype);
  };

  const Alert = (text) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });
  };

  const onNextStep = () => {
    if (systemname !== "" && newstype.length !== 0) {
      nextStep(2);
    } else {
      if (systemname === "") {
        Alert("Please enter system name");
      } else {
        Alert("Please enter news type at least 1");
      }
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(
        info.file.originFileObj,
        (imageUrl) => changeImage(imageUrl),
        setLoading(true)
      );
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const uploadButtonAfter = (
    <div style={{ color: "white", padding: "0px 6px 5px 6px" }}>
      <EditOutlined />
    </div>
  );

  return (
    <div id="FormCreateSystem">
      <div className="text-center">
        {image ? (
          <div
            id="AfterUploadProfile"
            style={{ position: "relative", display: "inline-block" }}
          >
            <Profile src={image} />
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleChange}
            >
              {uploadButtonAfter}
            </Upload>
          </div>
        ) : (
          <div id="BeforeUploadProfile" className="text-center">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {uploadButton}
            </Upload>
          </div>
        )}
      </div>
      <Form
      className="mt-2"
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
      >
        <Form.Item name="systemname" label="System name">
          <Input
            value={systemname}
            onChange={(e) => changeSystemname(e.target.value)}
            style={{ borderRadius: "10px", height: "25px" }}
          />
        </Form.Item>
        <div className="row mt-3">
          <div className="col-8 col-sm-10 pr-0">
            <Form.Item label="News type">
              <Input
                value={newstypeInput}
                onChange={(e) => setNewstypeInput(e.target.value)}
                style={{ borderRadius: "10px", height: "25px" }}
              />
            </Form.Item>
          </div>
          <div className="col-4 col-sm-2 pt-3">
            <ButtonAddNewsType
              className="px-4 pt-1 font-small"
              onClick={() => addNewstype()}
            >
              Add
            </ButtonAddNewsType>
          </div>
        </div>
        <div>
          {newstype.map((newstype) => {
            return (
              <div className="d-inline-block mt-2 mr-2 font-small">
                <NewsTypeBox>
                  {newstype}
                  <Cancel
                    className="pr-0"
                    onClick={() => deleteNewstype(newstype)}
                  >
                    x
                  </Cancel>
                </NewsTypeBox>
              </div>
            );
          })}
        </div>
        <NextButton
          onClick={() => onNextStep()}
          className="col-12 py-2 mt-5 mt-sm-5 font-small"
        >
          Next
        </NextButton>
      </Form>
    </div>
  );
}

export default Step1;
