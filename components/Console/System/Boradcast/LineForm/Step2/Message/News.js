import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CreateLineBroadcastContext } from "../../../../../../../store/CreateLineBroadcastProvider";

import NewsCard from "../../../../NewsPublishCard";

const ImageCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Card = styled(NewsCard)`
  border-radius: 10px;
  border: ${(props) => (props.selected ? " 2px solid #050042" : "none")};
`;

export default function News({ boxnumber }) {
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

  return (
    <div>
      <div className="p-3 border-bottom">
        <div className="row">
          <div className="col-2">
            <ImageCover src={message.data.cover} />
          </div>
          <div className="col-10">
            <b>
              <span>{message.data.title}</span>
            </b>
            <br />
            <div
              dangerouslySetInnerHTML={createMarkup(message.data.body)}
            ></div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="row p-3">
          {news.map((news, key) => {
            return (
              <div key={key} className="col-4">
                <Card
                  onClick={() => onSelectNews(key)}
                  selected={news.id === message.data.id}
                  news={news}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
