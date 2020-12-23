import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AllNewsBox from "./AllNewsBox";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import Skeleton from "./Skeleton"

export default function AllNewsPage() {
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const path = `/console/${systemname}/${systemid}`;
  const [allnews, setAllnews] = useState(null);

  useEffect(() => {
    fetchAllNews();
  }, []);

  const fetchAllNews = async () => {
    await axios
      .get(`${process.env.REACT_APP_BE_PATH}/news/all?systemid=${systemid}`, {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(),
        },
      })
      .then((res) => {
        setAllnews(res.data);
      })
      .catch((err) => {
        console.log("err ", err);
      });
  };

  return (
    <div className="container pt-2">
      <h1>{systemname} - All news</h1>
      {allnews ? (
        <div>
          {/* <AllNewsBox type="Draft" news={allnews.draft} path={path} /> */}
          <AllNewsBox type="Publish" fetchNews={fetchAllNews} news={allnews.publish} path={path} />
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}
