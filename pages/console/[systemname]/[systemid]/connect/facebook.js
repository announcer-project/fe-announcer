import axios from "axios";
import cookie from "../../../../../tools/cookie";
import { withAuth } from "../../../../../tools/withAuth";
import Page from "../../../../../components/Console/System/Connect/ConnectFacebookPage";
import Head from "next/head";

export default function ConnectFacebookPage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>{props.query.systemname} - Announcer</title>
      </Head>
      <Page {...props} />
    </React.Fragment>
  );
}

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  return {
    props: { query: ctx.query },
  };
}
