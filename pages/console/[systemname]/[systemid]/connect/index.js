import Head from "next/head";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";

import Page from "../../../../../components/Console/System/Connect/AllConnectPage";

function AllConnectPage({ systemname, lineConnected }) {
  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <Page lineConnected={lineConnected} />
    </React.Fragment>
  );
}

const checkConnect = async (ctx) => {
  let line = false;
  const query = ctx.query;
  console.log(query.systemid);
  await axios
    .get(
      `${process.env.REACT_APP_BE_PATH}/connect/line/check?systemid=${query.systemid}`,
      {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(ctx),
        },
      }
    )
    .then((res) => {
      line = res.data;
      console.log(res.data);
    });
  return line;
};

AllConnectPage.getInitialProps = async (ctx) => {
  const lineConnected = await checkConnect(ctx);
  return {
    systemname: ctx.query.systemname,
    lineConnected,
  };
};

export default withAuth(withLayout(AllConnectPage));
