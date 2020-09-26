import axios from "axios";
import cookie from "../../../../../tools/cookie";
import { withAuth } from "../../../../../tools/withAuth";
import Page from "../../../../../components/Console/System/Setting/SettingAdminPage";
import Head from "next/head";

export default function SettingAdminPage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>{props.query.systemname} - NMS</title>
      </Head>
      <Page {...props} />
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
  const { systemid } = ctx.query;
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

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  let admins = await fetchAllAdmin(ctx);
  let user = await fetchUser(ctx);
  return {
    props: { query: ctx.query, console: true, system: true, admins, user },
  };
}
