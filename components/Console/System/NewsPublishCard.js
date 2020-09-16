import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const Cover = styled.img`
  height: 100px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
`;

const Card = styled.div`
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
`;

const Body = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const Footer = styled.div``;
export default function NewsPublishCard(props) {
  const router = useRouter();
  const { systemid } = router.query;

  const createMarkup = (body) => {
    return { __html: body };
  };

  let postdate = new Date(props.news.create_date);
  let postdateFormat = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(postdate);

  return (
    <div {...props}>
      <Card className="shadow-sm">
        <Cover
          src={`${process.env.REACT_APP_STORAGE}/news/${systemid}-${props.news.ID}-cover.png`}
        />
        <div className="px-2">
          <span>
            <b>{props.news.title}</b>
          </span>
          <Body className="mt-1">
            <div dangerouslySetInnerHTML={createMarkup(props.news.body)}></div>
          </Body>
          <Footer className="font-small color-drop mt-1">
            <div>Post {postdateFormat}</div>
          </Footer>
        </div>
      </Card>
    </div>
  );
}
