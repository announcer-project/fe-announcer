import React, { useContext, useEffect } from "react";
import Head from "next/head";
import newstypes from "../../../../../newstype.json";
import targetgroups from "../../../../../targetgroup.json";
import users from "../../../../../User.json";
import news from "../../../../../news.json";
import { CreateLineBroadcastProvider } from "../../../../../store/CreateLineBroadcastProvider";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import { withAuth } from "../../../../../tools/withAuth";

import Page from "../../../../../components/Console/System/Boradcast/BroadcastLinePage";

export default function BroadcastLinePage(props) {
  return (
    <>
      <Head>
        <title>{props.query.systemname} - NMS</title>
      </Head>
      <CreateLineBroadcastProvider>
        <Page {...props} />
      </CreateLineBroadcastProvider>
    </>
  );
}

const setSelected = (data) => {
  let newData = [];
  for (let index = 0; index < data.length; index++) {
    let newdata1 = data[index];
    let newdata2 = {
      ...newdata1,
      selected: false,
    };
    newData.push(newdata2);
  }
  return newData;
};

const fetchAboutLineBroadcast = async (ctx) => {
  let data = {};
  const query = ctx.query;
  await axios
    .get(
      `${process.env.REACT_APP_BE_PATH}/broadcast/line/aboutsystem?systemid=${query.systemid}`,
      {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(ctx),
        },
      }
    )
    .then((res) => {
      data = {
        newstypes: setSelected(res.data.newstypes),
        targetgroups: setSelected(res.data.targetgroups),
        users: setSelected(res.data.users),
        news: res.data.news,
      };
    });

  return data;
};

export async function getServerSideProps(ctx) {
  const auth = await withAuth(ctx);
  let page = {};
  let aboutLineBroadcast = [];
  if (auth) {
    page = {
      name: "broadcast",
    };
    aboutLineBroadcast = await fetchAboutLineBroadcast(ctx);
  }
  return {
    props: { query: ctx.query, page, aboutLineBroadcast },
  };
}
