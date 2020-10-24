import Head from "next/head";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import withAuth from "../../../../../hoc/withAuth"
import withLayout from "../../../../../hoc/withLayoutConsole"

import Page from "../../../../../components/Console/System/Role/RoleRequest/RoleRequest";

function RoleRequestPage({systemname, rolerequests}) {
  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <Page rolerequests={rolerequests} />
    </React.Fragment>
  );
}

const fetchRoleRequests = async (ctx) => {
  let rolerequests = [];
  const query = ctx.query;
  await axios
    .get(`${process.env.REACT_APP_BE_PATH}/role/request/${query.systemid}`, {
      headers: {
        Authorization: "Bearer " + cookie.getJWT(ctx),
      },
    })
    .then((res) => {
      rolerequests = res.data;
    });
  return rolerequests;
};

RoleRequestPage.getInitialProps = async (ctx) => {
  const rolerequests = await fetchRoleRequests(ctx);
  return {
    systemname: ctx.query.systemname,
    rolerequests,
  };
};

export default withAuth(withLayout(RoleRequestPage));
