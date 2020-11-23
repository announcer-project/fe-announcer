import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "../../common/Button";
import { EditOutlined } from "@ant-design/icons";

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
  background-color: white;
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
export default function NewsDraftCard(props) {
  const router = useRouter();
  const { systemid } = router.query;

  const createMarkup = (body) => {
    return { __html: body };
  };
  console.log(props)
  return (
    <div {...props}>
      <Card className="shadow-sm">
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
          <Footer className="d-flex justify-content-between font-small mt-1 pb-1">
            <div>
              <span className="color-drop">Draft by Panupong</span>
            </div>
            <div>
              <ButtonCard><EditOutlined className="mr-1" /> Edit</ButtonCard>
            </div>
          </Footer>
        </div>
      </Card>
    </div>
  );
}
