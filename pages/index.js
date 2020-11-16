import Head from "next/head";
import withLayout from "../hoc/withLayout";

import Page from "../components/Home/HomePage";

function Home() {
  return (
    <>
      <Head>
        <title>Announcer</title>
      </Head>
      <Page />
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  return { page: "home" };
};

export default withLayout(Home);
