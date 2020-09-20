import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";
import cookie from "../../tools/cookie";
import { withNotAuth } from "../../tools/withNotAuth";

const Page = dynamic(
  () => {
    return import("../../components/Login/LoginPage");
  },
  { ssr: false }
);

function LoginPage() {
  return (
    <>
      <Head>
        <title>Announcer - Login</title>
      </Head>
      <Page />
    </>
  );
}

const fetchJWT = async (ctx) => {
  const { socialid, social, email, pictureurl } = ctx.query;
  let data = {
    Social: social,
    SocialID: socialid,
  };
  await axios
    .post(`${process.env.REACT_APP_BE_PATH}/login`, data)
    .then(async (res) => {
      await cookie.setJWT(ctx, res.data.jwt, 30);
    })
    .catch(async (err) => {
      const { res } = ctx;
      let path = `/register?social=${social}&socialid=${socialid}&email=${email}&pictureurl=${pictureurl}`;
      if (social === "facebook") {
        path = `/register?social=${social}&socialid=${socialid}&email=${email}`;
      }
      res.writeHead(302, { Location: path });
      res.end();
    });
};

export async function getServerSideProps(ctx) {
  await withNotAuth(ctx);
  // let { social, socialid } = ctx.query;
  // if (social !== undefined && social !== "undefined") {
  //   if (socialid !== undefined && socialid !== "undefined") {
  //     await fetchJWT(ctx);
  //     const { res } = ctx;
  //     res.writeHead(302, { Location: "/console/systems" });
  //     res.end();
  //     return { props: {} };
  //   }
  // }
  return { props: {} };
}

export default LoginPage;
