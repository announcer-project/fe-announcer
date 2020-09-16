import React, { useEffect, useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";

const EditRole = dynamic(
  () => {
    return import("../../../../../../components/Line/Profile/Edit/EditRole");
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
      <EditRole />
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
