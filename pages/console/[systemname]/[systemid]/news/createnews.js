import Head from "next/head";
import { CreateNewsProvider } from "../../../../../store/CreateNewsProvider";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";

import Page from "../../../../../components/Console/System/News/CreateNews/CreateNewsPage";

function CreateNewsPage({ systemname }) {
  return (
    <>
      <Head>
        <title>{systemname} - NMS</title>
      </Head>
      <CreateNewsProvider>
        <Page />
      </CreateNewsProvider>
    </>
  );
}

CreateNewsPage.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
  };
};

export default withAuth(withLayout(CreateNewsPage));
