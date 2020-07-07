import React, { useContext, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Input, Checkbox, DatePicker, Upload, Modal } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { CreateNewsContext } from "../../../../../../store/CreateNewsProvider";

const CKEditor = dynamic(() => import("./CKEditor"), {
  ssr: false,
});

const NewsType = styled.div`
  border-radius: 20px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#050042" : "white")};
  color: ${(props) => (props.selected ? "white" : "rgb(0,0,0,0.65)")};
`;

const Button = styled.button`
  background-color: #050042;
  color: white;
  &:hover {
    color: white;
  }
`;

export default function FromCreateNews(props) {
  const { title, changeTitle } = useContext(CreateNewsContext);
  const { body, changeBody } = useContext(CreateNewsContext);
  const { expiredateStatus, changeStatusExpiredate } = useContext(
    CreateNewsContext
  );
  const { expiredate, changeExpiredate } = useContext(CreateNewsContext);
  const { fileImage, changeFileImage } = useContext(CreateNewsContext);
  const { newsTypes, selectNewsType } = useContext(CreateNewsContext);
  const { changeStep } = useContext(CreateNewsContext);
  const { setPostdate } = useContext(CreateNewsContext);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const today = new Date();
    const newsTypes = props.newsTypes;
    selectNewsType(newsTypes);
    setPostdate(today);
    scrollToTop();
  }, []);

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

  const onSelectNewsType = async (key) => {
    let newNewsTypes = newsTypes;
    newNewsTypes[key].selected = !newNewsTypes[key].selected;
    selectNewsType(newNewsTypes);
  };

  const onPreview = async (files) => {
    if (title === "" || body === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter Title and Content",
      });
    } else {
      let newstypes = newsTypes.filter(function (newsType) {
        return newsType.selected;
      });
      if (newstypes.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select news type",
        });
      } else {
        if (expiredateStatus && expiredate === null) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please select expiredate",
          });
        } else {
          changeStep(2);
        }
      }
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div>
      <Input
        name="title"
        value={title}
        onChange={(e) => changeTitle(e.target.value)}
        placeholder="Title"
      />
      <div className="pt-3">
        <CKEditor
          data={body}
          config={{
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "blockQuote",
              "link",
              "numberedList",
              "bulletedList",
              "|",
              "undo",
              "redo",
            ],
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            changeBody(data);
          }}
        />
      </div>
      <div className="pt-3">
        <Checkbox
          onChange={() => changeStatusExpiredate(expiredateStatus)}
          checked={expiredateStatus}
        >
          Expiredate
        </Checkbox>
        <DatePicker
          disabled={!expiredateStatus}
          defaultValue={
            expiredate === null ? "" : moment(expiredate, "DD-MM-YYYY")
          }
          onChange={(date, dateString) => {
            const dateNow = new Date();
            changeExpiredate(date);
          }}
        />
      </div>
      <div className="pt-3">
        <div className="clearfix">
          <Upload
            customRequest={dummyRequest}
            listType="picture-card"
            fileList={fileImage}
            multiple
            onPreview={handlePreview}
            onChange={handleChange}
          >
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </div>
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </div>
      </div>
      <div className="pt-1">
        Select news type
        <div className="pt-2">
          {newsTypes.map((newstype, key) => {
            return (
              <NewsType
                key={key}
                onClick={() => onSelectNewsType(key)}
                selected={newstype.selected}
                className="border shadow-sm d-inline-block py-2 px-4 mr-2"
              >
                {newstype.newstype}
              </NewsType>
            );
          })}
        </div>
      </div>
      <div className="text-right pt-3">
        <Button
          onClick={() => onPreview(fileImage)}
          className="btn px-4 d-flex ml-auto"
        >
          <EyeOutlined
            className="mr-2 "
            style={{ fontSize: "20px", paddingTop: "3px" }}
          />
          <span>Preview</span>
        </Button>
      </div>
    </div>
  );
}
