import Head from "next/head";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";

import Page from "../../../../../components/Console/System/Setting/SettingAdminPage";

function SettingAdminPage({ systemname }) {
  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <Page />
    </React.Fragment>
  );
}

SettingAdminPage.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
  };
};

export default withAuth(withLayout(SettingAdminPage));
