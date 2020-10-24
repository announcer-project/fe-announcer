import Head from "next/head";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";

import Page from "../../../../../components/Console/System/Setting/SettingAdminPage";

function SettingAdminPage({ systemname, admins, user }) {
  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - NMS</title>
      </Head>
      <Page admins={admins} userdb={user} />
    </React.Fragment>
  );
}

const fetchAllAdmin = async (ctx) => {
  const { systemid } = ctx.query;
  let admins = [];
  await axios
    .get(`${process.env.REACT_APP_BE_PATH}/admin/${systemid}`, {
      headers: {
        Authorization: "Bearer " + cookie.getJWT(ctx),
      },
    })
    .then((res) => {
      admins = res.data;
    });
  return admins;
};

const fetchUser = async (ctx) => {
  let user = {};
  await axios
    .get(`${process.env.REACT_APP_BE_PATH}/user`, {
      headers: {
        Authorization: "Bearer " + cookie.getJWT(ctx),
      },
    })
    .then((res) => {
      user = res.data;
    });
  return user;
};

SettingAdminPage.getInitialProps = async (ctx) => {
  let admins = await fetchAllAdmin(ctx);
  let user = await fetchUser(ctx);
  return {
    systemname: ctx.query.systemname,
    admins,
    user,
  };
};

export default withAuth(withLayout(SettingAdminPage));
