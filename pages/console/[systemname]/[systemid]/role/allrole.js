import Head from "next/head";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";

import Page from "../../../../../components/Console/System/Role/AllRole/AllRolePage";

function AllRolePage({ systemname }) {
  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - NMS</title>
      </Head>
      <Page />
    </React.Fragment>
  );
}

AllRolePage.getInitialProps = async (ctx) => {
  return { systemname: ctx.query.systemname };
};

export default withAuth(withLayout(AllRolePage));
