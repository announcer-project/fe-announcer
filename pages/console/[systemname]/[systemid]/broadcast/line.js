import React from "react";
import Head from "next/head";
import { CreateLineBroadcastProvider } from "../../../../../store/CreateLineBroadcastProvider";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";

import Page from "../../../../../components/Console/System/Boradcast/BroadcastLinePage";

function BroadcastLinePage({ systemname }) {
  return (
    <>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <CreateLineBroadcastProvider>
        <Page />
      </CreateLineBroadcastProvider>
    </>
  );
}

BroadcastLinePage.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
  };
};

export default withAuth(withLayout(BroadcastLinePage));
