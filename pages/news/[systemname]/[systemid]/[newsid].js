import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Modal } from "antd";
import moment from "moment";
import Navbar from "../../../../components/News/Navbar";

const Topic = styled.div`
  font-size: 1.8rem;
`;
const Line = styled.hr`
  border: 1px solid #36689a;
  color: #36689a;
`;
const BoxNewstype = styled.div`
  border: 1px solid #a6a6a6;
  border-radius: 25px;
  display: inline-block;
  padding: 5px 15px;
  margin-left: 10px;
`;
const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  cursor: pointer;
`;

const Cover = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export default function NewsPage({news, systemname, systemid}) {

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const showModal = async (url, imagename) => {
    setPreviewImage(url);
    setPreviewVisible(true);
    setPreviewTitle(imagename);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const createMarkup = (body) => {
    return { __html: body };
  };
  return (
    <div>
      <Navbar systemname={systemname} systemid={systemid} />
      <div className="container">
        <div className="col-lg-8 mx-auto py-5">
          <Cover
            src={`${process.env.REACT_APP_STORAGE}/news/${news.system_id}-${news.ID}-cover.png`}
          />
          <Topic className="mt-3">{news.title}</Topic>
          <Line />
          <div className="d-flex justify-content-between">
            <div>
              Post date : {moment(news.create_date).format("DD/MM/YYYY")}
              <br />
              Expire date : {moment(news.expire_date).format("DD/MM/YYYY")}
            </div>
            <div>Written by : Panupong</div>
          </div>
          <div className="mt-4">
            <div
              dangerouslySetInnerHTML={createMarkup(news.body)}
              className="editor"
            ></div>
          </div>
          <div className="row mt-3">
            {news.Image.map((image, key) => {
              return (
                <div className="col-12 col-lg-4">
                  <Image
                    onClick={() =>
                      showModal(
                        `${process.env.REACT_APP_STORAGE}/news/${image.ImageName}`,
                        image.ImageName
                      )
                    }
                    src={`${process.env.REACT_APP_STORAGE}/news/${image.ImageName}`}
                  />
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
          <div className="mt-3">
            News type :
            {news.type_of_news.map((newstype, key) => {
              return (
                <BoxNewstype className="shadow">
                  {newstype.NewsTypeName}
                </BoxNewstype>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const fetchNews = async (id) => {
  let news = {};
  await axios
    .get(`${process.env.REACT_APP_BE_PATH}/news/publish/${id}`)
    .then((res) => {
      news = res.data;
    });
  return news;
};

NewsPage.getInitialProps = async (ctx) => {
  let news = await fetchNews(ctx.query.newsid);
  return {
    systemname: ctx.query.systemname,
    systemid: ctx.query.systemid,
    news: news,
  };
};
