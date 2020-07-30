import React, { useState, useContext } from "react";
import { Upload } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { CreateLineBroadcastContext } from "../../../../../../../store/CreateLineBroadcastProvider";

import "./Upload.module.css";

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
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <div>
      {message.data !== "" ? (
        ""
      ) : (
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
      )}
      {message.data !== "" ? (
        <div style={{ position: "relative" }}>
          <img
            className="imgUploaded"
            src={message.data}
            alt="avatar"
            style={{ width: "100%" }}
          />
          <button
            style={{ position: "absolute", right: "0px" }}
            type="button"
            className="btn btn-danger"
            onClick={() => onRemove()}
          >
            <CloseOutlined />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
