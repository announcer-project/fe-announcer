import Head from "next/head";
import axios from "axios";
import cookie from "../../tools/cookie";
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

const fetchJWT = async (ctx) => {
  const query = ctx.query;
  let social = "";
  if (query.state === "linelogin") {
    social = "line";
  } else if (query.state === "facebooklogin") {
    social = "facebook";
  }
  await axios
    .get(`${process.env.REACT_APP_BE_PATH}/linelogin`, {
      headers: {
        Code: query.code,
        Social: social,
        UserID: query.code,
      },
    })
    .then(async (res) => {
      await cookie.setJWT(ctx, res.data, 30);
    })
    .catch((err) => {
      const { res } = ctx;
      res.setHeader("location", "/register");
      res.statusCode = 302;
      res.end();
    });
};

export async function getServerSideProps(ctx) {
  await withNotAuth(ctx);
  const { code, state } = ctx.query;
  if (code !== undefined) {
    if (state === "linelogin") {
      console.log("code", code);
      console.log("state", state);
      console.log("ธฎฆธฆธฎฆธฆธ", state);
      await fetchJWT(ctx);
      const { res } = ctx;
      res.setHeader("location", "/console/systems");
      res.statusCode = 302;
      res.end();
    } else if (state === "facebooklogin") {
      await fetchJWT(ctx);
      console.log("code", code);
      console.log("state", state);
    }
    return { props: {} };
  }
  return {
    props: {},
  };
}

export default LoginPage;
