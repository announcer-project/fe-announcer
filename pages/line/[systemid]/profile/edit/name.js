import React, { useEffect, useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const EditName = dynamic(
  () => {
    return import("../../../../../components/Line/Profile/Edit/EditNamePage");
  },
  { ssr: false }
);

function LineLiffEditName({}) {
  return (
    <>
      <Head>
        <title>Edit Profile</title>
      </Head>
      <EditName />
    </>
  );
}

LineLiffEditName.getInitialProps = async (ctx) => {
  return {
    systemid: ctx.query.systemid,
  };
};

export default LineLiffEditName
