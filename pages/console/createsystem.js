import Head from "next/head";
import cookie from "../../tools/cookie";
import axios from "axios";
import { CreatesystemProvider } from "../../store/CreatesystemProvider";

import { withAuth } from "../../tools/withAuth";

import Page from "../../components/Console/Createsystem/CreatesystemPage";

function SystemsPage(props) {
  return (
    <>
      <Head>
        <title>Announcer - Create system</title>
      </Head>
      <CreatesystemProvider>
        <Page {...props} />
      </CreatesystemProvider>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  return {
    props: { console: true },
  };
}

export default SystemsPage;
