import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "../Layout/Layout";
import News from "./News";
import NewsTypes from "./NewsTypes";
import TargerGroups from "./TargetGroups";

function HomeSystemPage(props) {
  const router = useRouter();
  const { systemname, systemid } = router.query;

  return (
    <>
      <div className="container py-3">
        <h1>{systemname}</h1>
        {props.news ? (
          <News news={props.news} systemname systemid />
        ) : (
          <p>loading</p>
        )}
        <div className="mt-3">
          {props.newstypes ? (
            <NewsTypes newstypes={props.newstypes} />
          ) : (
            <p>loading</p>
          )}
        </div>
        <div className="mt-3">
          {props.targetgroups ? (
            <TargerGroups targetgroups={props.targetgroups} systemname systemid />
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
    </>
  );
}

export default HomeSystemPage;
