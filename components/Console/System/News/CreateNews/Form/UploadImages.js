import React, { useState } from "react";

import styled from "styled-components";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UploadImage = styled(Upload)`
  .ant-upload.ant-upload-select-picture-card {
    margin-right: 0px;
    margin-bottom: 0px;
  }
  .ant-upload.ant-upload-select-picture-card:hover {
    border-color: #050042;
  }
`;

export default React.memo(function UploadImages({
  fileImage,
  changeFileImage,
}) {
  console.log("update images");

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    changeFileImage(fileList);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div className="clearfix">
      <UploadImage
        customRequest={dummyRequest}
        listType="picture-card"
        fileList={fileImage}
        multiple
        onPreview={handlePreview}
        onChange={handleChange}
      >
        <div>
          <PlusOutlined />
          <div className="ant-upload-text">Upload images</div>
        </div>
      </UploadImage>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
});
