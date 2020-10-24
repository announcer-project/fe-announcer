import Head from "next/head";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";

import Page from "../../../../../components/Console/System/TargetGroup/CreateTargetGroup/CreateTargetGroupPage";

function CreateTargetGroupPage({ systemname, membersDB }) {
  return (
    <>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <Page membersdb={membersDB} />
    </>
  );
}

const fetchMembers = async (ctx) => {
  let members = [];
  const query = ctx.query;
  await axios
    .get(
      `${process.env.REACT_APP_BE_PATH}/member/all?systemid=${query.systemid}`,
      {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(ctx),
        },
      }
    )
    .then((res) => {
      members = res.data;
    });
  return members;
};

CreateTargetGroupPage.getInitialProps = async (ctx) => {
  const membersDB = await fetchMembers(ctx);
  return {
    systemname: ctx.query.systemname,
    membersDB,
  };
};

export default withAuth(withLayout(CreateTargetGroupPage));
