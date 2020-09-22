import Head from "next/head";
import axios from "axios";
import cookie from "../../../../tools/cookie";
import { withAuth } from "../../../../tools/withAuth";

import Page from "../../../../components/Console/System/Home/HomePage";

function HomeSystemPage(props) {
  return (
    <>
      <Head>
        <title>{props.query.systemname} - NMS</title>
      </Head>
      <Page {...props} />
    </>
  );
}

const fetchAboutSystem = async (ctx) => {
  const query = ctx.query
  let aboutSystem = [];
  await axios
    .get(
      `${process.env.REACT_APP_BE_PATH}/aboutsystem?systemid=${query.systemid}&systemname=${query.systemname}`,
      {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(ctx),
        },
      }
    )
    .then((res) => {
      aboutSystem = res.data;
    });
  return aboutSystem;
};

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  const page = {
    name: "home",
  };
  const aboutSystem = await fetchAboutSystem(ctx)
  return {
    props: { query: ctx.query, page, aboutSystem, console: true, system: true },
  };
}

export default HomeSystemPage;
