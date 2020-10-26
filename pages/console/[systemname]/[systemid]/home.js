import Head from "next/head";
import withAuth from "../../../../hoc/withAuth";
import withLayout from "../../../../hoc/withLayoutConsole";

import HomePage from "../../../../components/Console/System/Home/HomePage";

function Page({ systemname, aboutSystem }) {
  return (
    <>
      <Head>
        <title>{systemname} - NMS</title>
      </Head>
      <HomePage {...aboutSystem} />
    </>
  );
}

Page.getInitialProps = async (ctx) => {
  return { systemname: ctx.query.systemname };
};

export default withAuth(withLayout(Page));
