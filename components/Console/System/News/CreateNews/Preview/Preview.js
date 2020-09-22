import React, { useContext, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import {
  NotificationFilled,
  FileAddFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import moment from "moment";
import Swal from "sweetalert2";
import coverNews from "./cover.json";
import Button from "../../../../../common/Button";

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

export default function PreviewNews() {
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const { changeStep } = useContext(CreateNewsContext);
  const {
    cover,
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
  if (expiredate !== null) {
    expiredateFormat = moment(expiredate).format("DD-MM-YYYY");
  }

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [creating, setCreating] = useState(false);

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
    onCreateNews("draft");
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
  const onCreateNews = async (status) => {
    if (!creating) {
      setCreating(true);
      let expiredate_status = true;
      if (expiredate === null) {
        expiredate_status = false;
      }
      let data = {
        cover: cover === "" ? coverNews.image_cover : cover,
        title: title,
        body: body,
        checkexpiredate: expiredate_status,
        expiredate: moment(expiredate).format("DD-MM-YYYY"),
        images: await imagesToBase64(),
        newstypes: newsTypes.filter(function (newstype) {
          return newstype.selected;
        }),
        system: systemname,
        systemid: systemid,
        status: status,
      };
      await axios
        .post(`${process.env.REACT_APP_BE_PATH}/news/create`, data, {
          headers: {
            Authorization: "Bearer " + cookie.getJWT(),
          },
        })
        .then((res) => {
          let path = `/console/${systemname}/${systemid}`;
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
                  Router.push(path + `/broadcast/line`);
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
            setCreating(false);
          }
        });
    }
  };

  return (
    <div>
      <div className="px-5 pt-3 border rounded">
        <div className="text-center">
          <span>Preview</span>
        </div>
        <div className="pt-3">
          <div>
            <img
              src={`${cover === "" ? "/img/news-cover.png" : cover}`}
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
          </div>
          <Title className="text-center mt-2 mb-4 py-4">
            <span className="font-large">{title}</span>
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
                <p className={`${expiredate !== null ? "" : "d-none"}`}>
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
                          {newstype.name}
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
          <Button danger={true} onClick={() => changeStep(1)}>
            Back
          </Button>
        </div>
        <div className="d-inine-block">
          <div className="d-flex">
            <div className="d-inine-block">
              <Button onClick={onDraft} className="mr-2">
                <LoadingOutlined
                  className={`mr-2 ${creating ? "" : "d-none"} `}
                />
                <FileAddFilled
                  className={`mr-2 ${creating ? "d-none" : ""} `}
                />
                <span>Draft</span>
              </Button>
            </div>
            <div className="d-inine-block">
              <Button onClick={onPublish}>
                <LoadingOutlined
                  className={`mr-2 ${creating ? "" : "d-none"} `}
                />
                <NotificationFilled
                  className={`mr-2 ${creating ? "d-none" : ""} `}
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
