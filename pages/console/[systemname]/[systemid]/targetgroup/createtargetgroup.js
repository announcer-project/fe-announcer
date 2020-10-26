import Head from "next/head";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";

import Page from "../../../../../components/Console/System/TargetGroup/CreateTargetGroup/CreateTargetGroupPage";

function CreateTargetGroupPage({ systemname }) {
  return (
    <>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <Page />
    </>
  );
}

CreateTargetGroupPage.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
  };
};

export default withAuth(withLayout(CreateTargetGroupPage));
