import Head from "next/head";
import axios from "axios";
import cookie from "../../../../tools/cookie";
import withAuth from "../../../../hoc/withAuth";
import withLayout from "../../../../hoc/withLayoutConsole";

import HomePage from "../../../../components/Console/System/Home/HomePage";

function Page({ systemname, aboutSystem }) {
  return (
    <>
      <Head>
        <title>{systemname} - NMS</title>
      </Head>
      <HomePage {...aboutSystem} />
    </>
  );
}

Page.getInitialProps = async (ctx) => {
  const aboutSystem = await fetchAboutSystem(ctx);
  return { systemname: ctx.query.systemname, aboutSystem };
};

export default withAuth(withLayout(Page));

const fetchAboutSystem = async (ctx) => {
  const query = ctx.query;
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
