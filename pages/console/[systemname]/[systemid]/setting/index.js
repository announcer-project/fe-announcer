import Head from "next/head";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import withAuth from "../../../../../hoc/withAuth"
import withLayout from "../../../../../hoc/withLayoutConsole"

import Page from "../../../../../components/Console/System/Setting/SettingPage";

function SettingPage({ systemname, systemDetail }) {
  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - NMS</title>
      </Head>
      <Page systemDetail={systemDetail} />
    </React.Fragment>
  );
}

const fetchSystem = async (ctx) => {
  let { systemid } = ctx.query;
  let system = {};
  await axios
    .get(`${process.env.REACT_APP_BE_PATH}/system/${systemid}`, {
      headers: {
        Authorization: "Bearer " + cookie.getJWT(ctx),
      },
    })
    .then((res) => {
      system = res.data;
    });
  return system;
};

SettingPage.getInitialProps = async (ctx) => {
  let system = await fetchSystem(ctx);
  return { systemname: ctx.query.systemname, systemDetail: system };
};

export default withAuth(withLayout(SettingPage));
