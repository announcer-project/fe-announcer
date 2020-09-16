import React, { useEffect, useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";

const EditNewsType = dynamic(
  () => {
    return import("../../../../../../components/Line/Profile/Edit/EditNewsType");
  },
  { ssr: false }
);

export default function LineLiffRegister(props) {
  const query = props.query;
  return (
    <>
      <Head>
        <title>Announcer - {query.systemname} register</title>
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
