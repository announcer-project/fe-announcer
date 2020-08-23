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

function LoginPage(props) {
  return (
    <>
      <Head>
        <title>Announcer - Login</title>
      </Head>
      <Page social={props.social} />
    </>
  );
}

const fetchJWT = async (ctx) => {
  const { socialid, social, email, pictureurl } = ctx.query;
  await axios
    .get(`${process.env.REACT_APP_BE_PATH}/login`, {
      headers: {
        Social: social,
        SocialID: socialid,
        Email: email,
        PictureUrl: pictureurl,
      },
    })
    .then(async (res) => {
      await cookie.setJWT(ctx, res.data, 30);
    })
    .catch(async (err) => {
      const { res } = ctx;
      let path = `/register?social=${social}&socialid=${socialid}&email=${email}&pictureurl=${pictureurl}`;
      if (social === "facebook") {
        path = `/register?social=${social}&socialid=${socialid}&email=${email}`;
      }
      res.setHeader("location", path);
      res.statusCode = 302;
      res.end();
    });
};

export async function getServerSideProps(ctx) {
  await withNotAuth(ctx);
  let { social, socialid } = ctx.query;
  if (social !== undefined && social !== "undefined") {
    if (socialid !== undefined && socialid !== "undefined") {
      await fetchJWT(ctx);
      const { res } = ctx;
      res.setHeader("location", "/console/systems");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }
  } else {
    social = null;
  }
  return { props: { social } };
}

export default LoginPage;
