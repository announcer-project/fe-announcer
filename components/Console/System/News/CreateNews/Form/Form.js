import React, { useContext, useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Input, Checkbox, DatePicker } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { CreateNewsContext } from "../../../../../../store/CreateNewsProvider";

//component
import UploadImageCover from "./UploadCover";
import UploadImages from "./UploadImages";

import "./CKEditor.module.css";
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
  border-radius: 50px;
  background-color: #050042;
  color: white;
  &:hover {
    color: white;
  }
`;

export default function FromCreateNews(props) {
  const {
    title,
    body,
    cover,
    expiredateStatus,
    expiredate,
    fileImage,
    newsTypes,
  } = useContext(CreateNewsContext);

  const {
    changeTitle,
    changeBody,
    changeCover,
    changeStatusExpiredate,
    changeExpiredate,
    changeFileImage,
    selectNewsType,
    setPostdate,
    changeStep,
  } = useContext(CreateNewsContext);
  const [coverState, setCover] = useState(cover);
  const [titleState, setTitle] = useState(title);
  const [bodyState, setBody] = useState(body);
  const [checkExpiredateState, setCheckExpiredate] = useState(expiredateStatus);
  const [expiredateState, setExpiredate] = useState(expiredate);
  const [fileImageState, setFileImage] = useState(fileImage);

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

  const onPreview = async (files) => {
    if (titleState === "" || bodyState === "") {
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
        if (checkExpiredateState && expiredateState === null) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please select expiredate",
          });
        } else {
          changeCover(coverState);
          changeTitle(titleState);
          changeBody(bodyState);
          changeStatusExpiredate(checkExpiredateState);
          changeExpiredate(expiredateState);
          changeFileImage(fileImageState);
          changeStep(2);
        }
      }
    }
  };

  return (
    <div>
      <div>
        <UploadImageCover cover={coverState} onChangeCover={setCover} />
      </div>
      <div className="mt-3">
        <InputTitle title={titleState} onChangeTitle={setTitle} />
      </div>
      <div className="mt-3">
        <InputBody body={bodyState} onChangeBody={setBody} />
      </div>
      <div className="mt-3">
        <SelectExpiredate
          checkExpiredate={checkExpiredateState}
          setCheckExpiredate={setCheckExpiredate}
          expiredate={expiredateState}
          setExpiredate={setExpiredate}
        />
      </div>
      <div className="mt-3">
        <UploadImages
          fileImage={fileImageState}
          changeFileImage={setFileImage}
        />
      </div>
      <div className="mt-3">
        <SelectNewsTypes newstypes={newsTypes} setNewstypes={selectNewsType} />
      </div>
      <div className="text-right mt-3">
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

const InputTitle = React.memo(({ title, onChangeTitle }) => {
  console.log("update title");

  return (
    <Input
      name="title"
      value={title}
      onChange={(e) => onChangeTitle(e.target.value)}
      placeholder="Title"
    />
  );
});

const InputBody = React.memo(({ body, onChangeBody }) => {
  console.log("update body");

  return (
    <div>
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
          onChangeBody(data);
        }}
      />
    </div>
  );
});

const SelectExpiredate = React.memo(
  ({ checkExpiredate, setCheckExpiredate, expiredate, setExpiredate }) => {
    console.log("update expiredate");

    return (
      <div className="pt-3">
        <Checkbox
          onChange={() => setCheckExpiredate(!checkExpiredate)}
          checked={checkExpiredate}
        >
          Expiredate
        </Checkbox>
        <DatePicker
          disabled={!checkExpiredate}
          defaultValue={
            expiredate === null ? "" : moment(expiredate, "DD-MM-YYYY")
          }
          onChange={(date, dateString) => {
            setExpiredate(date);
          }}
        />
      </div>
    );
  }
);

const SelectNewsTypes = React.memo(({ newstypes, setNewstypes }) => {
  console.log("update newstypes", newstypes);

  const onSelectNewsType = async (key) => {
    let newNewsTypes = newstypes;
    newNewsTypes[key].selected = !newNewsTypes[key].selected;
    setNewstypes(newNewsTypes);
  };

  return (
    <div>
      Select news type
      <div>
        {newstypes.map((newstype, key) => {
          return (
            <NewsType
              key={key}
              onClick={() => onSelectNewsType(key)}
              selected={newstype.selected}
              className="border shadow-sm d-inline-block py-2 px-4 mr-2 mt-2"
            >
              {newstype.newstype}
            </NewsType>
          );
        })}
      </div>
    </div>
  );
});
