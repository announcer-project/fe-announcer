import axios from "axios";
import Head from "next/head";
import cookie from "../../../../../tools/cookie";
import withAuth from "../../../../../hoc/withAuth"
import withLayout from "../../../../../hoc/withLayoutConsole"

import Page from "../../../../../components/Console/System/TargetGroup/AllTargetGroup/AllTargetGroupPage";

function AllTargetGroupPage({ systemname }) {
  return (
    <>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <Page />
    </>
  );
}

AllTargetGroupPage.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
  };
};

export default withAuth(withLayout(AllTargetGroupPage))
