import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cookie from "../../../../tools/cookie";
import axios from "axios";

import News from "./News";
import NewsTypes from "./NewsTypes";
import TargerGroups from "./TargetGroups";

import { NewsLoading, NewsTypesLoading, TargetgroupsLoading } from "./Skeleton";
import { system } from "../../../../api";

function HomeSystemPage(props) {
  const router = useRouter();
  const { systemname, systemid } = router.query;
  const [news, setNews] = useState(null);
  const [newstypes, setNewstypes] = useState(null);
  const [targetgroups, setTagetgroups] = useState(null);

  useEffect(() => {
    fetchAboutSystem();
  }, []);

  const fetchAboutSystem = () => {
    axios
      .get(
        `${process.env.REACT_APP_BE_PATH}/aboutsystem?systemid=${systemid}&systemname=${systemname}`,
        {
          headers: {
            Authorization: "Bearer " + cookie.getJWT(),
          },
        }
      )
      .then((res) => {
        let aboutSystem = res.data;
        setNews(aboutSystem.news);
        setNewstypes(aboutSystem.newstypes);
        setTagetgroups(aboutSystem.targetgroups);
      });
  };

  return (
    <>
      <div className="container py-3">
        <h1>{systemname}</h1>
        {news ? <News news={news} systemname={systemname} systemid={systemid} /> : <NewsLoading />}
        <div className="mt-3">
          {newstypes ? (
            <NewsTypes newstypes={newstypes} />
          ) : (
            <NewsTypesLoading />
          )}
        </div>
        <div className="mt-3">
          {targetgroups ? (
            <TargerGroups targetgroups={targetgroups} systemname={systemname} systemid={systemid} />
          ) : (
            <TargetgroupsLoading />
          )}
        </div>
      </div>
    </>
  );
}

export default HomeSystemPage;
