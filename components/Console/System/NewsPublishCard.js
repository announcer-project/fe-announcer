import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "../../common/Button";
import { ReadOutlined, SendOutlined } from "@ant-design/icons";
import Link from "next/link";
import { news as newsapi } from "../../../api"
import Swal from "sweetalert2";

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
  console.log(props, "sdsdsd")
  const router = useRouter();
  const { systemid, systemname } = router.query;

  const deleteNews = async () => {
    Swal.fire({
      title: "Do you want to delete this news?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then( async (result) => {
      if (result.value) {
        await newsapi.delete(`/delete/${props.news.ID}`).then(res => {
          Swal.fire({
            icon: "success",
            title: "Delete news success",
            showConfirmButton: true,
            timer: 3000,
          }).then((result) => {
            props.fetchNews()
          });
        }).catch(err => {
          Swal.fire({
            icon: "error",
            title: "Delete news fail",
            showConfirmButton: true,
            timer: 3000,
          })
        })
      }
    });
  }

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
            className={`mt-1 justify-content-between ${!props.footer ? "d-none" : "d-flex"
              }`}
          >
            <ButtonCard onClick={_ => deleteNews()} danger={true} className="mr-2">
              <span className="mr-1">
                <ReadOutlined />
              </span>
              <span>
                Delete
              </span>
            </ButtonCard>
            <div>
              <Link
                href={`/news/${systemname}/${systemid}/${props.news.ID}`}
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
            </div>
            {/* <div>Post {postdateFormat}</div> */}
          </Footer>
        </div>
      </Card>
    </div>
  );
}
