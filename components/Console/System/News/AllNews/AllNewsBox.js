import Link from 'next/link'
import styled from "styled-components";
import { EyeOutlined } from "@ant-design/icons";

const BoxNews = styled.div`
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  cursor: pointer;
  background-color: white;
`;
const BoxAllNews = styled.div`
  background-color: #050042;
`;
const BoxBody = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
`;
const BoxTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp:2
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

const Button = styled.button`
  background-color: #050042;
  color: white;
  &:hover {
    color: white;
  }
`;

export default function AllNewsBox(props) {
  const path = props.path;
  const newstype = props.type
  const news = props.news

  const createMarkup = (body) => {
    return { __html: body };
  };

  return (
    <BoxAllNews className="col-12 py-3 px-5 rounded mt-3">
      <h5 className="text-light">{newstype}</h5>
      <div className="row">
        {news.map((news, key) => {
          return (
            <div key={key} className="col-4 p-2">
              <BoxNews className="shadow-sm p-3 ">
                <BoxTitle className="mb-2">
                  <b>{news.Title}</b>
                </BoxTitle>
                <BoxBody className="mb-2">
                  <div
                    dangerouslySetInnerHTML={createMarkup(news.Body)}
                    className="editor"
                  ></div>
                </BoxBody>
                {news.author}
                <p>{news.postdate}</p>
                <div className="d-flex justify-content-between">
                  <Link href={`${path}/news/${news.ID}/announce`}>
                    <Button className="btn px-3 d-flex ml-auto">
                      <EyeOutlined
                        className="mr-2 "
                        style={{ fontSize: "16px", paddingTop: "3px" }}
                      />
                      <span style={{ fontSize: "14px" }}>Announce</span>
                    </Button>
                  </Link>
                  <Link href={`${path}/news/${news.Title}/${news.ID}`}>
                    <Button className="btn px-3 d-flex ml-auto">
                      <EyeOutlined
                        className="mr-2 "
                        style={{ fontSize: "16px", paddingTop: "3px" }}
                      />
                      <span style={{ fontSize: "14px" }}>View</span>
                    </Button>
                  </Link>
                </div>
              </BoxNews>
            </div>
          );
        })}
      </div>
    </BoxAllNews>
  );
}
