import Head from "next/head";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";

import Page from "../../../../../components/Console/System/Connect/AllConnectPage";

function AllConnectPage({ systemname }) {
  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <Page />
    </React.Fragment>
  );
}

AllConnectPage.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
  };
};

export default withAuth(withLayout(AllConnectPage));
