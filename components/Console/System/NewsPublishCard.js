import React from "react";
import styled from "styled-components";

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
const Footer = styled.div`

`
export default function NewsPublishCard(props) {
  const createMarkup = (body) => {
    return { __html: body };
  };
  return (
    <div {...props}>
      <Card className="shadow-sm">
        <Cover src={props.news.cover} />
        <div className="px-2">
          <span>
            <b>{props.news.title}</b>
          </span>
          <Body className="mt-1">
            <div dangerouslySetInnerHTML={createMarkup(props.news.body)}></div>
          </Body>
          <Footer className="d-flex justify-content-between font-small color-drop mt-1">
            <div>
              Post {props.news.postdate}
            </div>
            <div>
              Send {props.news.send} View {props.news.view}
            </div>
          </Footer>
        </div>
      </Card>
    </div>
  );
}
