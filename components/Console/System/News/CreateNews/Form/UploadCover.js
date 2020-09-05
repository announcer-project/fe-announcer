import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Upload } from "antd";
import {
  PlusOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { CreateNewsContext } from "../../../../../../store/CreateNewsProvider";

const UploadCover = styled(Upload)`
  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    height: 250px;
    margin-right: 0px;
    margin-bottom: 0px;
  }
  .ant-upload.ant-upload-select-picture-card:hover {
    border-color: #050042;
  }
`;

const RemoveCover = styled.button`
  background-color: #ce0000;
  border: none;
  color: white;
  position: absolute;
  right: 0px;
`;

export default React.memo(function UploadImageCover({ cover, onChangeCover }) {
  console.log("update cover");
  const [loading, setLoading] = useState(false);

  const handleChangeCover = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64Cover(info.file.originFileObj, (imageUrl) => {
        onChangeCover(imageUrl);
        setLoading(false);
      });
    }
  };

  function getBase64Cover(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUploadCover(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  function onRemoveCover() {
    onChangeCover("");
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload image cover</div>
    </div>
  );

  return (
    <div>
      {cover !== "" ? (
        ""
      ) : (
        <UploadCover
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUploadCover}
          onChange={handleChangeCover}
        >
          {uploadButton}
        </UploadCover>
      )}
      {cover !== "" ? (
        <div style={{ position: "relative" }}>
          <img
            className="imgUploaded border rounded"
            src={cover}
            alt="avatar"
            style={{ width: "100%", height: "250px", objectFit: "cover" }}
          />
          <RemoveCover className="p-3 pt-2" onClick={() => onRemoveCover()}>
            <CloseOutlined />
          </RemoveCover>
        </div>
      ) : (
        ""
      )}
    </div>
  );
});
