import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { CreateLineBroadcastProvider } from "../../../../../store/CreateLineBroadcastProvider";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";
import axios from "axios";
import cookie from "../../../../../tools/cookie";

import Page from "../../../../../components/Console/System/Boradcast/BroadcastLinePage";

function BroadcastLinePage({ systemname, aboutLineBroadcast }) {
  return (
    <>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <CreateLineBroadcastProvider>
        <Page aboutLineBroadcast={aboutLineBroadcast} />
      </CreateLineBroadcastProvider>
    </>
  );
}

BroadcastLinePage.getInitialProps = async (ctx) => {
  let aboutLineBroadcast = await fetchAboutLineBroadcast(ctx);
  return {
    systemname: ctx.query.systemname,
    aboutLineBroadcast,
  };
};

export default withAuth(withLayout(BroadcastLinePage));

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
