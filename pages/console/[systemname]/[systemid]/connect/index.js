import axios from "axios";
import cookie from "../../../../../tools/cookie";
import { withAuth } from "../../../../../tools/withAuth";
import Page from "../../../../../components/Console/System/Connect/AllConnectPage";
import Head from "next/head";

export default function AllConnectPage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>{props.query.systemname} - Announcer</title>
      </Head>
      <Page {...props} />
    </React.Fragment>
  );
}

const checkConnect = async (ctx) => {
  let line = false;
  const query = ctx.query;
  console.log(query.systemid);
  await axios
    .get(
      `${process.env.REACT_APP_BE_PATH}/connect/line/check?systemid=${query.systemid}`,
      {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(ctx),
        },
      }
    )
    .then((res) => {
      line = res.data;
      console.log(res.data);
    });
  return line;
};

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  const lineConnected = await checkConnect(ctx);
  console.log(lineConnected);
  return {
    props: { query: ctx.query, console: true, system: true, lineConnected },
  };
}
