import axios from "axios";
import Head from "next/head";
import cookie from "../../../../../tools/cookie";
import withAuth from "../../../../../hoc/withAuth"
import withLayout from "../../../../../hoc/withLayoutConsole"

import Page from "../../../../../components/Console/System/TargetGroup/AllTargetGroup/AllTargetGroupPage";

function AllTargetGroupPage({ systemname, targetGroups }) {
  return (
    <>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <Page targetGroups={targetGroups} />
    </>
  );
}

const fetchTargetGroups = async (ctx) => {
  let targetgroups = [];
  const query = ctx.query;
  await axios
    .get(`${process.env.REACT_APP_BE_PATH}/targetgroup/${query.systemid}/all`, {
      headers: {
        Authorization: "Bearer " + cookie.getJWT(ctx),
      },
    })
    .then((res) => {
      targetgroups = res.data;
    });
  return targetgroups;
};

AllTargetGroupPage.getInitialProps = async (ctx) => {
  const targetGroups = await fetchTargetGroups(ctx);
  return {
    systemname: ctx.query.systemname,
    targetGroups,
  };
};

export default withAuth(withLayout(AllTargetGroupPage))
