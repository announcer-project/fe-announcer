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

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  return {
    props: { query: ctx.query, console: true, system: true },
  };
}
