import Head from "next/head";
import cookie from "../../tools/cookie";
import axios from "axios";

import { withAuth } from "../../tools/withAuth";

import Page from "../../components/Console/Systems/SystemsPage";

function SystemsPage(props) {
  return (
    <>
      <Head>
        <title>Announcer - Systems</title>
      </Head>
      <Page {...props} />
    </>
  );
}

const fetchSystems = async (ctx) => {
  let header = {
    Authorization: "Bearer " + cookie.getJWT(ctx),
  };
  let admins = [];
  await axios
    .get(`${process.env.REACT_APP_BE_PATH}/system/all`, {
      headers: header,
    })
    .then((res) => {
      admins = res.data;
    })
    .catch((err) => {
      console.log("err: ", err.message);
    });
  return admins;
};

export async function getServerSideProps(ctx) {
  const auth = await withAuth(ctx);
  let admins = [];
  if (auth) {
    admins = await fetchSystems(ctx);
  }
  return {
    props: {
      admins,
      console: true,
    },
  };
}

export default SystemsPage;
