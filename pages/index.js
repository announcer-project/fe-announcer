import Head from "next/head";

import Page from "../components/Home/HomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>NMS - News Management System</title>
      </Head>
      <Page />
    </>
  );
}
