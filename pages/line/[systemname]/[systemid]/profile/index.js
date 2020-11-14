import React, { useEffect, useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const Profile = dynamic(
  () => {
    return import("../../../../../components/Line/Profile/ProfilePage");
  },
  { ssr: false }
);

function LineLiffProfile({ systemname }) {
  return (
    <>
      <Head>
        <title>Profile - {systemname}</title>
      </Head>
      <Profile />
    </>
  );
}

LineLiffProfile.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
  };
};

export default LineLiffProfile
