import axios from "axios";
import cookie from "../../../../../tools/cookie";
import { withAuth } from "../../../../../tools/withAuth";
import Page from "../../../../../components/Console/System/Setting/SettingPage";
import Head from "next/head";

export default function SettingPage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>{props.query.systemname} - NMS</title>
      </Head>
      <Page {...props} />
    </React.Fragment>
  );
}

const fetchSystem = async (ctx) => {
  let { systemid } = ctx.query;
  let system = {};
  await axios
    .get(`${process.env.REACT_APP_BE_PATH}/system/${systemid}`, {
      headers: {
        Authorization: "Bearer " + cookie.getJWT(ctx),
      },
    })
    .then((res) => {
      system = res.data;
    });
  return system;
};

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  let system = await fetchSystem(ctx)
  return {
    props: { query: ctx.query, console: true, system: true, systemDetail: system },
  };
}
