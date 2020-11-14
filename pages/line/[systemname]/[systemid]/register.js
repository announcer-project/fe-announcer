import React, { useEffect, useContext } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";

import { LineRegisterProvider } from "../../../../store/LineRegisterProvider";

const LineRegister = dynamic(
  () => {
    return import("../../../../components/Line/Register/RegisterPage");
  },
  { ssr: false }
);

export default function LineLiffRegisterPage({systemname}) {
  return (
    <>
      <Head>
        <title>{systemname} - Register</title>
      </Head>
      <LineRegisterProvider>
        <LineRegister />
      </LineRegisterProvider>
    </>
  );
}

LineLiffRegisterPage.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
    systemid: ctx.query.systemid,
  };
};