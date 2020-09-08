import Head from "next/head";

import Page from "../components/Home/HomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Announcer</title>
      </Head>
      <Page />
    </>
  );
}
