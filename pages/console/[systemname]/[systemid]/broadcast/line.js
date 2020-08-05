import React, { useContext, useEffect } from "react";
import Head from "next/head";
import newstypes from "../../../../../newstype.json";
import targetgroups from "../../../../../targetgroup.json";
import users from "../../../../../User.json";
import news from "../../../../../news.json";
import { CreateLineBroadcastProvider } from "../../../../../store/CreateLineBroadcastProvider";
// import axios from "axios";
// import cookie from "../../../../tools/cookie";
// import { withAuth } from "../../../../tools/withAuth";

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
  const data = {
    newstypes: setSelected(newstypes),
    targetgroups: setSelected(targetgroups),
    users: setSelected(users),
    news: news,
  };
  // const query = ctx.query
  // let aboutSystem = [];
  // await axios
  //   .get(
  //     `${process.env.REACT_APP_BE_PATH}/aboutsystem?systemid=${query.systemid}&systemname=${query.systemname}`,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + cookie.getJWT(ctx),
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     aboutSystem = res.data;
  //   });


  return data;
};

export async function getServerSideProps(ctx) {
  //   await withAuth(ctx);
  const page = {
    name: "broadcast",
  };
  const aboutLineBroadcast = await fetchAboutLineBroadcast(ctx);
  return {
    props: { query: ctx.query, page, aboutLineBroadcast },
  };
}
