import Head from "next/head";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";

import Page from "../../../../../components/Console/System/Role/RoleRequest/RoleRequest";

function RoleRequestPage({ systemname }) {
  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <Page />
    </React.Fragment>
  );
}

RoleRequestPage.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
  };
};

export default withAuth(withLayout(RoleRequestPage));
