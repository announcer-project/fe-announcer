import axios from "axios";
import cookie from "../../../../../tools/cookie";
import { withAuth } from "../../../../../tools/withAuth";
import Page from "../../../../../components/Console/System/Role/AllRole/AllRolePage";
import Head from "next/head";

export default function AllRolePage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>{props.query.systemname} - NMS</title>
      </Head>
      <Page {...props} />
    </React.Fragment>
  );
}

const fetchRole = async (ctx) => {
  let roles = [];
  const query = ctx.query;
  await axios
    .get(`${process.env.REACT_APP_BE_PATH}/role/all?systemid=${query.systemid}`)
    .then((res) => {
      roles = res.data;
    });
  let newRoles = [];
  roles.forEach((role) => {
    let approve = "";
    if (role.require) {
      approve = "Must approve";
    }
    newRoles.push({ ...role, mustapprove: approve });
  });
  return newRoles;
};

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  const role = await fetchRole(ctx);
  return {
    props: { query: ctx.query, role, console: true, system: true },
  };
}
