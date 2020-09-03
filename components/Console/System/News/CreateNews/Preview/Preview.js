import React, { useContext, useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import styled from "styled-components";
import { NotificationFilled, FileAddFilled } from "@ant-design/icons";
import { Modal } from "antd";
import moment from "moment";
import Swal from "sweetalert2";

import cookie from "../../../../../../tools/cookie";
import { CreateNewsContext } from "../../../../../../store/CreateNewsProvider";

const NewsType = styled.div`
    border-radius: 20px;
    background-color: "white";
    color: "rgb(0,0,0,0.65)";
`;

const ImageBox = styled.div`
  height: 200px;
  cursor: pointer;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Title = styled.div`
  background-color: #eeeeee;
`;

const Button = styled.button`
  background-color: #050042;
  color: white;
  &:hover {
    color: white;
  }
`;

export default function PreviewNews(props) {
  const { changeStep } = useContext(CreateNewsContext);
  const {
    title,
    body,
    fileImage,
    postdate,
    expiredate,
    expiredateStatus,
    newsTypes,
  } = useContext(CreateNewsContext);

  const postdateFormat = moment(postdate).format("DD-MM-YYYY");
  let expiredateFormat = "";
  if (expiredateStatus) {
    expiredateFormat = moment(expiredate).format("DD-MM-YYYY");
  }

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
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

  const showModal = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const createMarkup = (body) => {
    return { __html: body };
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onDraft = async () => {
    onCreateNews("draft", []);
  };
  const onPublish = () => {
    onCreateNews("publish");
  };

  const imagesToBase64 = async () => {
    let images = [];
    for (let index = 0; index < fileImage.length; index++) {
      images.push(await getBase64(fileImage[index].originFileObj));
    }
    return images;
  };
  const onCreateNews = async (status, images) => {
    let data = {
      title: title,
      body: body,
      checkexpiredate: expiredateStatus,
      expiredate: moment(expiredate).format("DD-MM-YYYY"),
      images: await imagesToBase64(),
      newstypes: newsTypes.filter(function (newstype) {
        return newstype.selected;
      }),
      system: props.query.systemname,
      systemid: props.query.systemid,
      status: status,
    };
    await axios
      .post(`${process.env.REACT_APP_BE_PATH}/news/create`, data, {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(),
        },
      })
      .then((res) => {
        let path = `/console/${props.query.systemname}/${props.query.systemid}`;
        if (status === "draft") {
          Swal.fire({
            icon: "success",
            title: "Draft news success",
            showConfirmButton: true,
            timer: 3000,
          }).then((result) => {
            Router.push(path + "/news/allnews");
          });
        } else if (status === "publish") {
          Swal.fire({
            icon: "success",
            title: "Create news success",
            showConfirmButton: true,
            timer: 3000,
          }).then((result) => {
            Swal.fire({
              title: "Do you want to announce the news?",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes",
            }).then((result) => {
              if (result.value) {
                Router.push(path + `/news/${res.data}/announce`);
              } else {
                Router.push(path + "/news/allnews");
              }
            });
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data,
          });
        }
      });
  };

  return (
    <div>
      <div className="px-5 pt-3 border rounded">
        <div className="text-center">
          <span>Preview</span>
        </div>
        <div>
          <Title className="text-center mt-3 mb-4 py-3 ">
            <div className="container">
              <h5>{title}</h5>
            </div>
          </Title>
          <div className="container">
            <div
              dangerouslySetInnerHTML={createMarkup(body)}
              className="editor"
            ></div>
            <div>
              <div className={`pt-3 ${fileImage.length === 0 ? "d-none" : ""}`}>
                <div className="col-12">
                  <div className="row">
                    {fileImage.map((image, key) => {
                      return (
                        <div key={key} className="col-12 col-sm-4 p-1 mb-3">
                          <ImageBox onClick={() => showModal(image)}>
                            <Image
                              src={URL.createObjectURL(image.originFileObj)}
                            />
                          </ImageBox>
                          <Modal
                            title={previewTitle}
                            visible={previewVisible}
                            onCancel={() => handleCancel()}
                            footer={null}
                          >
                            <Image src={previewImage} />
                          </Modal>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="pt-3 pb-5">
                <p>Postdate : {postdateFormat}</p>
                <p className={`${expiredateStatus ? "" : "d-none"}`}>
                  Expiredate : {expiredateFormat}
                </p>
                <p>
                  News types :
                  {newsTypes.map((newstype, key) => {
                    if (newstype.selected) {
                      return (
                        <NewsType
                          key={key}
                          className="border shadow-sm d-inline-block py-2 px-4 ml-2"
                        >
                          {newstype.newstype}
                        </NewsType>
                      );
                    }
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between pt-3">
        <div className="d-inine-block">
          <button onClick={() => changeStep(1)} className="btn btn-danger">
            Back
          </button>
        </div>
        <div className="d-inine-block">
          <div className="d-flex">
            <div className="d-inine-block">
              <Button onClick={onDraft} className="btn ml-2 d-flex">
                <FileAddFilled
                  className="mr-2 "
                  style={{ fontSize: "20px", paddingTop: "3px" }}
                />
                <span>Draft</span>
              </Button>
            </div>
            <div className="d-inine-block">
              <Button onClick={onPublish} className="btn ml-2 d-flex">
                <NotificationFilled
                  className="mr-2 "
                  style={{ fontSize: "20px", paddingTop: "3px" }}
                />
                <span>Publish</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
