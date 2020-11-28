import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "../../common/Button";
import { ReadOutlined, SendOutlined } from "@ant-design/icons";
import Link from "next/link";

const Cover = styled.img`
  height: 100px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
`;

const Card = styled.div`
  border-radius: 10px;
  width: 100%;
`;

const Title = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const Body = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const ButtonCard = styled(Button)`
  padding-top: 3px;
  padding-bottom: 3px;
  font-size: 12px;
`;
const Footer = styled.div``;

export default function NewsPublishCard(props) {
  const router = useRouter();
  const { systemid, systemname } = router.query;

  const createMarkup = (body) => {
    return { __html: body };
  };

  return (
    <div {...props}>
      <Card className="shadow-sm pb-2">
        <Cover
          src={`${process.env.REACT_APP_STORAGE}/news/${systemid}-${props.news.ID}-cover.png`}
        />
        <div className="px-2">
          <Title>
            <b>{props.news.title}</b>
          </Title>
          <Body className="mt-1">
            <div dangerouslySetInnerHTML={createMarkup(props.news.body)}></div>
          </Body>
          <Footer
            className={`font-small color-drop mt-1 text-right ${
              !props.footer ? "d-none" : ""
            }`}
          >
            <Link
              href={`/news/${systemid}/${props.news.ID}`}
              prefetch={false}
            >
              <a target="_blank">
                <ButtonCard className="mr-2">
                  <span className="mr-1">
                    <ReadOutlined />
                  </span>
                  Read
                </ButtonCard>
              </a>
            </Link>
            <Link
              href={`/console/[systemname]/[systemid]/broadcast/line?systemname=${systemname}&systemid=${systemid}`}
              as={`/console/${systemname}/${systemid}/broadcast/line`}
            >
              <a>
                <ButtonCard>
                  <span className="mr-1">
                    <SendOutlined />
                  </span>
                  Send
                </ButtonCard>
              </a>
            </Link>
            {/* <div>Post {postdateFormat}</div> */}
          </Footer>
        </div>
      </Card>
    </div>
  );
}
