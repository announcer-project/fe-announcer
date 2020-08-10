import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { RegisterContext } from "../../store/RegisterProvider";
import { Input, Button, Form, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import RegisterButton from "./RegisterButton";

const Profile = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 150px;
`;

function Step2({query}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const {
    image,
    firstname,
    lastname,
    step,
    nextStep,
    changeImageUrl,
    changeImage,
    changeFirstname,
    changeLastname,
  } = useContext(RegisterContext);

  useEffect(() => {
    if(query.pictureurl !== undefined) {
      changeImage(query.pictureurl)
    }else{
      changeImageUrl(false)
    }
    form.setFieldsValue({
      firstname: firstname,
      lastname: lastname,
    });
  }, []);

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
        changeImageUrl(false),
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
    <div>
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
        id="RegisterForm"
        form={form}
        name="basic"
        onFinish={() => nextStep(3)}
      >
        <Form.Item
          name="firstname"
          rules={[{ required: true, message: "Please input your Firstname" }]}
          valuePropName={firstname}
        >
          <div>
            <span>Firstname</span>
            <Input
              type="text"
              value={firstname}
              onChange={(e) => changeFirstname(e.target.value)}
              style={{ borderRadius: "10px", height: "25px" }}
            />
          </div>
        </Form.Item>
        <Form.Item
          name="lastname"
          rules={[{ required: true, message: "Please input your Lastname" }]}
          valuePropName={lastname}
        >
          <div>
            <span>Lastname</span>
            <Input
              type="text"
              value={lastname}
              onChange={(e) => changeLastname(e.target.value)}
              style={{ borderRadius: "10px", height: "25px" }}
            />
          </div>
        </Form.Item>
        <div className="col-6 mx-auto mt-3">
          <Form.Item>
            <RegisterButton
              className="font-small py-2 px-3 col-12"
              type="submit"
            >
              Next
            </RegisterButton>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default Step2;
