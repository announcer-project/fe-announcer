import React, { useEffect, useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const EditRole = dynamic(
  () => {
    return import("../../../../../components/Line/Profile/Edit/EditRole");
  },
  { ssr: false }
);

function LineLiffEditRole() {
  return (
    <>
      <Head>
        <title>Edit Profile</title>
      </Head>
      <EditRole />
    </>
  );
}


LineLiffEditRole.getInitialProps = async (ctx) => {
  return {
    systemid: ctx.query.systemid,
  };
};

export default LineLiffEditRole