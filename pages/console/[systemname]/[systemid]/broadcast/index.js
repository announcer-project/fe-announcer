import Head from "next/head";
import { withAuth } from "../../../../tools/withAuth";

import Page from "../../../../../components/Console/System/Boradcast/BroadcastPage";

export default function BroadcastPage(props) {
  return (
    <>
      <Head>
        <title>{props.query.systemname} - NMS</title>
      </Head>
      <Page {...props} />
    </>
  );
}

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  return {
    props: { query: ctx.query },
  };
}
