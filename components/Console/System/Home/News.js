import React from "react";
import Link from "next/link";
import styled from "styled-components";
import NewsCard from "../NewsPublishCard";

const SeeMore = styled.span`
  cursor: pointer;
  &:hover {
    color: #050042;
    text-decoration: underline;
  }
`;

export default function News({ news, query }) {
  return (
    <div className="border rounded p-3 mt-3 ">
      <div className="d-flex justify-content-between">
        <span className="font-large">News</span>
        <Link
          href={`/console/${query.systemname}/${query.systemid}/news/allnews`}
        >
          <SeeMore className="font-small align-text-bottom mt-1">
            See more
          </SeeMore>
        </Link>
      </div>
      {news.length === 0 ? (
        <div className="border p-4 text-center font-small color-drop mt-2">
          Not have news
        </div>
      ) : (
        <div className="col-12 mt-2">
          <div className="row">
            {news.map((news) => {
              return <Link href={`/news/systemname/systemid/${news.ID}`}><NewsCard className="col-12 col-lg-4" news={news} /></Link>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
