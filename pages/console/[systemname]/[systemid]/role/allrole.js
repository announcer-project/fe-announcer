import Head from "next/head";
import axios from "axios";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";

import Page from "../../../../../components/Console/System/Role/AllRole/AllRolePage";

function AllRolePage({ systemname, role }) {
  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - NMS</title>
      </Head>
      <Page role={role} />
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

AllRolePage.getInitialProps = async (ctx) => {
  const role = await fetchRole(ctx);
  return { systemname: ctx.query.systemname, role };
};

export default withAuth(withLayout(AllRolePage));
