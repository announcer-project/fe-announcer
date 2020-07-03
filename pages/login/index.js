import React, { useEffect, useState } from "react";
import Head from "next/head";
import cookie from "../../tools/cookie";
import axios from "axios";
import { withNotAuth } from "../../tools/withNotAuth";

import Page from "../../components/Login/LoginPage";

function LoginPage() {
  return (
    <>
      <Head>
        <title>NMS - Login</title>
      </Head>
      <Page />
    </>
  );
}

const fetchJWT = async (code, ctx) => {
  await axios
    .get(`${process.env.REACT_APP_BE_PATH}/linelogin`, {
      headers: {
        Code: code,
      },
    })
    .then(async (res) => {
      await cookie.setJWT(ctx, res.data, 30);
    });
};

export async function getServerSideProps(ctx) {
  await withNotAuth(ctx);
  const { code } = ctx.query;
  if (code !== undefined) {
    await fetchJWT(code, ctx);
    const { res } = ctx;
    res.setHeader("location", "/console/systems");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
  return {
    props: {},
  };
}

export default LoginPage;
