import React from "react";
import Link from "next/link";
import styled from "styled-components";
import NewsCard from "../NewsPublishCard";
import { Empty } from "antd";
import Button from "../../../common/Button";

const SeeMore = styled.span`
  cursor: pointer;
  &:hover {
    color: #050042;
    text-decoration: underline;
  }
`;

export default function News({ news, systemname, systemid }) {
  return (
    <div className="border rounded p-3 mt-3 ">
      <div className="d-flex justify-content-between">
        <span className="font-large">News</span>
        <Link href={`/console/${systemname}/${systemid}/news/allnews`}>
          <SeeMore className="font-small align-text-bottom mt-1">
            See more
          </SeeMore>
        </Link>
      </div>
      {news.length === 0 ? (
        <div className="border p-4 text-center font-small color-drop mt-2">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Not have news"
          >
            <Link href={`/console/${systemname}/${systemid}/news/createnews`}>
              <Button>Create news</Button>
            </Link>
          </Empty>
        </div>
      ) : (
        <div className="col-12">
          <div className="row">
            {news.slice(0).reverse().slice(0,3).map((news) => {
              return (
                <div className="mt-2 col-12 col-sm-4">
                  <NewsCard news={news} footer={true} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
