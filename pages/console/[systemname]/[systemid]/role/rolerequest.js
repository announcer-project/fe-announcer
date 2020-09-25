import axios from "axios";
import cookie from "../../../../../tools/cookie";
import { withAuth } from "../../../../../tools/withAuth";
import Page from "../../../../../components/Console/System/Role/RoleRequest/RoleRequest";
import Head from "next/head";

export default function RoleRequestPage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>{props.query.systemname} - NMS</title>
      </Head>
      <Page {...props} />
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

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  const rolerequests = await fetchRoleRequests(ctx);
  return {
    props: { query: ctx.query, console: true, system: true, rolerequests },
  };
}
