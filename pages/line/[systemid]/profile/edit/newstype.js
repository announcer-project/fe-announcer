import React, { useEffect, useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const EditNewsType = dynamic(
  () => {
    return import("../../../../../components/Line/Profile/Edit/EditNewsType");
  },
  { ssr: false }
);

export default function LineLiffRegister() {
  return (
    <>
      <Head>
        <title>Edit Profile</title>
      </Head>
      <EditNewsType />
    </>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      query: ctx.query,
    },
  };
}
