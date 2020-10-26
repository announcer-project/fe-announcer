import axios from "axios";
import cookie from "../../../../../tools/cookie";
import Head from "next/head";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";

import Page from "../../../../../components/Console/System/News/CreateNewsType/CreateNewsTypePage";

function CreateNewsTypePage({ systemname }) {
  return (
    <>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <Page />
    </>
  );
}

CreateNewsTypePage.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
  };
};

export default withAuth(withLayout(CreateNewsTypePage));
