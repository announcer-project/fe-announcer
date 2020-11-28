import React, { useEffect, useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { LineRegisterProvider } from "../../../store/LineRegisterProvider";

const LineRegister = dynamic(
  () => {
    return import("../../../components/Line/Register/RegisterPage");
  },
  { ssr: false }
);

export default function LineLiffRegisterPage({}) {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <LineRegisterProvider>
        <LineRegister />
      </LineRegisterProvider>
    </>
  );
}

LineLiffRegisterPage.getInitialProps = async (ctx) => {
  return {
    systemid: ctx.query.systemid,
  };
};