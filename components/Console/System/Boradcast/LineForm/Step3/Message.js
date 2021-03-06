import React from "react";
import styled from "styled-components";

import "./TextMessage.module.css";

const Box = styled.div`
  background-color: white;
  border-radius: 20px;
  color: black;
`;

export function TextMessage({ text }) {
  const createMarkup = (body) => {
    return { __html: body };
  };
  return (
    <Box className="px-3 py-1 d-inline-block">
      <div id="textmessage" dangerouslySetInnerHTML={createMarkup(text)}></div>
    </Box>
  );
}

const Image = styled.img`
  width: 200px;
  height: auto;
`;
export function ImageMessage({ image }) {
  return <Image src={image} />;
}

const Cover = styled.img`
  height: 100px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
`;

const Card = styled.div`
  border-radius: 10px;
  width: 200px;
  background-color: white;
  color: black;
`;
const Title = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Body = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const Footer = styled.div`
  font-size: 12px;
  color: blue;
`;

export function NewsMessage({ news, systemid }) {
  const createMarkup = (body) => {
    return { __html: body };
  };
  console.log(news)
  return (
    <Card className="shadow-sm">
      <Cover src={`${process.env.REACT_APP_STORAGE}/news/${systemid}-${news.ID}-cover.png`} />
      <div className="px-2 py-2 border-bottom">
        <Title>
          <b>{news.title}</b>
        </Title>
        <Body className="mt-1">
          <div dangerouslySetInnerHTML={createMarkup(news.body)}></div>
        </Body>
      </div>
      <Footer className="mt-1 text-center py-2">
        <span>More Detail</span>
      </Footer>
    </Card>
  );
}
