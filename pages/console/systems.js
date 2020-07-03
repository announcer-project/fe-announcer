import Head from "next/head";
import cookie from "../../tools/cookie";
import axios from "axios";

import { withAuth } from "../../tools/withAuth";

import Page from "../../components/Console/Systems/SystemsPage";

function SystemsPage(props) {
  return (
    <>
      <Head>
        <title>NMS - Systems</title>
      </Head>
      <Page {...props} />
    </>
  );
}

const fetchSystems = async (ctx) => {
  let header = {
    Authorization: "Bearer " + cookie.getJWT(ctx),
  };
  let systems = [];
  await axios
    .get(`${process.env.REACT_APP_BE_PATH}/system/allsystem`, {
      headers: header,
    })
    .then((res) => {
      systems = res.data;
    });
  return systems;
};

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  const systems = await fetchSystems(ctx);
  return {
    props: { systems },
  };
}

export default SystemsPage;
