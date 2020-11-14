import React, { useEffect, useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const EditRole = dynamic(
  () => {
    return import("../../../../../../components/Line/Profile/Edit/EditRole");
  },
  { ssr: false }
);

function LineLiffEditRole({systemname}) {
  return (
    <>
      <Head>
        <title>Edit Profile - {systemname}</title>
      </Head>
      <EditRole />
    </>
  );
}


LineLiffEditRole.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
  };
};

export default LineLiffEditRole