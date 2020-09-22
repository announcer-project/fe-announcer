import React from "react";

import Layout from "../Layout/Layout";
import News from "./News";
import NewsTypes from "./NewsTypes";
import TargerGroups from "./TargetGroups";

function HomeSystemPage(props) {
  const systemname = props.query.systemname;
  const news = props.aboutSystem.news;
  const newstypes = props.aboutSystem.newstypes;
  const targetgroups = props.aboutSystem.targetgroups;

  return (
    <>
      <div className="container py-3">
        <span className="font-title">{systemname}</span>
        <News news={news} query={props.query} />
        <div className="mt-3">
          <NewsTypes newstypes={newstypes} />
        </div>
        <div className="mt-3">
          <TargerGroups targetgroups={targetgroups} />
        </div>
      </div>
    </>
  );
}

export default HomeSystemPage;
