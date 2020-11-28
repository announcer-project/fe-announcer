import React, { useEffect, useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const Profile = dynamic(
  () => {
    return import("../../../../components/Line/Profile/ProfilePage");
  },
  { ssr: false }
);

function LineLiffProfile({}) {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Profile />
    </>
  );
}

LineLiffProfile.getInitialProps = async (ctx) => {
  return {
    systemid: ctx.query.systemid,
  };
};

export default LineLiffProfile
