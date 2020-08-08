import React from "react";
import Link from "next/link"
import styled from "styled-components"

const SeeMore = styled.span`
    cursor: pointer;
    &:hover {
        color: #050042;
        text-decoration: underline;
    }
`

export default function News({ news, query }) {
  return (
    <div className="border rounded p-3 mt-3 ">
      <div className="d-flex justify-content-between">
        <span className="font-large">News</span>
        <Link
          href={`/console/${query.systemname}/${query.systemid}/news/allnews`}
        >
          <SeeMore className="font-small align-text-bottom mt-1">See more</SeeMore>
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
              return (
                <div className="col-4 p-2">
                  {/* <BoxNews className="shadow-sm pt-3 px-3">
                        <p>{news.title}</p>
                        <p clas>{news.body}</p>
                        <p>{news.author}</p>
                        <p>{news.postdate}</p>
                    </BoxNews> */}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
