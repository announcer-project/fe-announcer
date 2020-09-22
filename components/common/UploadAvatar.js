import React, { useState } from "react";
import { Upload } from "antd";
import styled from "styled-components";
import { LoadingOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";

const Profile = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 150px;
  border: 1px solid #050042;
`;

const StyleUpload = styled.div`
  #BeforeUploadProfile .ant-upload-picture-card-wrapper {
    width: auto;
  }

  #BeforeUploadProfile .ant-upload.ant-upload-select-picture-card {
    width: 150px;
    height: 150px;
    border-radius: 150px;
  }

  #BeforeUploadProfile .ant-upload.ant-upload-select-picture-card:hover {
    border-color: ${(props) => props.theme.color.base};
  }

  #AfterUploadProfile .ant-upload.ant-upload-select-picture-card {
    position: absolute;
    bottom: 21px;
    right: -1px;
    margin-right: 0px;
    margin-bottom: 0px;
    width: auto;
    height: auto;
    text-align: center;
    background-color: ${(props) => props.theme.color.base};
    border: none;
    border-radius: 150px;
    cursor: pointer;
    color: white;
  }
`;

export default function UploadAvatar({ image, changeImage }) {
  const [loading, setLoading] = useState(false);
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
    <StyleUpload>
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
    </StyleUpload>
  );
}
