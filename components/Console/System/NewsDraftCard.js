import React from "react";
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
  border: none;
  width: 100%;
  cursor: pointer;
  background-color: white;
`;

const Body = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const Footer = styled.div``;
export default function NewsDraftCard(props) {
  const router = useRouter();
  const { systemid } = router.query;

  const createMarkup = (body) => {
    return { __html: body };
  };

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
          <Footer className="d-flex justify-content-between font-small mt-1 pb-1">
            <div>
              <span className="color-drop">
                Panupong
                <br />
                Draft
              </span>
            </div>
            <div>
              <button>Edit</button>
            </div>
          </Footer>
        </div>
      </Card>
    </div>
  );
}
