import Head from "next/head";
// import newstypes from "../../../../newstype.json";
// import targetgroups from "../../../../targetgroup.json";
// import users from "../../../../User.json";
// import news from "../../../../news.json";
// import axios from "axios";
// import cookie from "../../../../tools/cookie";
// import { withAuth } from "../../../../tools/withAuth";

import Page from "../../../../../components/Console/System/Boradcast/BroadcastPage";

export default function BroadcastPage(props) {
  return (
    <>
      <Head>
        <title>{props.query.systemname} - NMS</title>
      </Head>
      <Page {...props} />
    </>
  );
}

const fetchAboutBroadcast = async (ctx) => {
  const data = {
    // newstypes: newstypes,
    // targetgroups: targetgroups,
    // users: users,
    // news: news,
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
  const aboutBroadcast = await fetchAboutBroadcast(ctx);
  return {
    props: { query: ctx.query, page, aboutBroadcast },
  };
}
