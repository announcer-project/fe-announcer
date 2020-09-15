import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Upload } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { CreateLineBroadcastContext } from "../../../../../../../store/CreateLineBroadcastProvider";

const StyleUpload = styled.div`
  .ant-upload.ant-upload-select-picture-card {
    margin-right: 0;
    margin-bottom: 0;
    border: 1px dashed ${(props) => props.theme.color.base};
    border-radius: 20px;
    width: 100%;
    height: ${(props) => props.height};
  }
  .ant-upload.ant-upload-select-picture-card:hover {
    border: 1px dashed ${(props) => props.theme.color.base_hover};
  }
  .ant-upload-picture-card-wrapper {
    display: unset;
  }
`;

const RemoveImageBtn = styled.button`
  background-color: ${(props) => props.theme.color.danger};
  border: none;
  color: white;
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 8px 13px;
  border-radius: 20px;
  &:hover {
    background-color: ${(props) => props.theme.color.danger_hover};
  }
  .anticon {
    vertical-align: 0em;
  }
`;

export default function Image({ boxnumber }) {
  const { messages, changeMessages } = useContext(CreateLineBroadcastContext);
  const message = messages[boxnumber];
  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        let newmessages = messages;
        newmessages[boxnumber].data = imageUrl;
        changeMessages(newmessages);
        setLoading(false);
      });
    }
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
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
  function onRemove() {
    let newmessages = messages;
    newmessages[boxnumber].data = "";
    changeMessages(newmessages);
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload image</div>
    </div>
  );
  return (
    <div>
      {message.data !== "" ? (
        ""
      ) : (
        <StyleUpload height={"200px"}>
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
        </StyleUpload>
      )}
      {message.data !== "" ? (
        <div style={{ position: "relative" }}>
          <img
            className="imgUploaded border"
            src={message.data}
            alt="avatar"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
          <RemoveImageBtn className="shadow" onClick={() => onRemove()}>
            <CloseOutlined />
          </RemoveImageBtn>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
