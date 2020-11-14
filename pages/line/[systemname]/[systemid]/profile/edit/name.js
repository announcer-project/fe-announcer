import React, { useEffect, useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const EditName = dynamic(
  () => {
    return import("../../../../../../components/Line/Profile/Edit/EditNamePage");
  },
  { ssr: false }
);

function LineLiffEditName({systemname}) {
  return (
    <>
      <Head>
        <title>Edit Profile - {systemname}</title>
      </Head>
      <EditName />
    </>
  );
}

LineLiffEditName.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
  };
};

export default LineLiffEditName
