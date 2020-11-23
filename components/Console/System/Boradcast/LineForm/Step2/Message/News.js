import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { CreateLineBroadcastContext } from "../../../../../../../store/CreateLineBroadcastProvider";

import NewsCard from "../../../../NewsPublishCard";

const ImageCover = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
`;

const Card = styled(NewsCard)`
  border-radius: 10px;
  border: ${(props) => (props.selected ? " 2px solid #050042" : "none")};
  cursor: pointer;
`;

const Title = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Body = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default function News({ boxnumber }) {
  const router = useRouter();
  const { systemid } = router.query;
  const { messages, changeMessages, news } = useContext(
    CreateLineBroadcastContext
  );
  const message = messages[boxnumber];

  useEffect(() => {
    let newmessages = messages;
    newmessages[boxnumber].data = news[0];
    changeMessages(newmessages);
  }, []);

  const onSelectNews = (key) => {
    let newmessages = messages;
    newmessages[boxnumber].data = news[key];
    changeMessages(newmessages);
  };

  const createMarkup = (body) => {
    return { __html: body };
  };
  console.log("message", message);
  return (
    <div>
      <div className="p-3 border-bottom">
        <div className="row">
          <div className="col-12 col-sm-2">
            <ImageCover
              src={`${process.env.REACT_APP_STORAGE}/news/${systemid}-${message.data.ID}-cover.png`}
            />
          </div>
          <div className="col-12 col-sm-10">
            <Title>
              <b>{message.data.title}</b>
            </Title>
            <Body
              dangerouslySetInnerHTML={createMarkup(message.data.body)}
            ></Body>
          </div>
        </div>
      </div>
      <div
        className="pb-3 pr-3 pt-0"
        style={{ overflow: "auto", whiteSpace: "nowrap" }}
      >
        {news.map((newsmap, key) => {
          return (
            <div key={key} style={{ overflow: "visible", whiteSpace: "normal" }} className="pt-3 col-12 col-sm-3 d-inline-block pl-3">
              <Card
                onClick={() => onSelectNews(key)}
                selected={newsmap.ID === message.data.ID}
                news={newsmap}
                footer={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
