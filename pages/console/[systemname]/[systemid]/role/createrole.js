import Head from "next/head";
import withAuth from "../../../../../hoc/withAuth"
import withLayout from "../../../../../hoc/withLayoutConsole"

import Page from "../../../../../components/Console/System/Role/CreateRole/CreateRolePage";

function CreateRolePage({ systemname }) {
  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <Page />
    </React.Fragment>
  );
}

CreateRolePage.getInitialProps = async (ctx) => {
  return { systemname: ctx.query.systemname };
};

export default withAuth(withLayout(CreateRolePage));
