import Head from "next/head";
import { CreatesystemProvider } from "../../store/CreatesystemProvider";
import withAuth from "../../hoc/withAuth"
import withLayout from "../../hoc/withLayout"

import Page from "../../components/Console/Createsystem/CreatesystemPage";

function SystemsPage() {
  return (
    <>
      <Head>
        <title>Announcer - Create system</title>
      </Head>
      <CreatesystemProvider>
        <Page />
      </CreatesystemProvider>
    </>
  );
}

export default withAuth(withLayout(SystemsPage));
