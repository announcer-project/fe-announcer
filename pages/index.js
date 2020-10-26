import Head from "next/head";
import withLayout from "../hoc/withLayout"

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

export default withLayout(Home)