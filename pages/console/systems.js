import Head from "next/head";
import withAuth from "../../hoc/withAuth"
import withLayout from "../../hoc/withLayout"

import Page from"../../components/Console/Systems/SystemsPage";

function SystemsPage(props) {
  return (
    <>
      <Head>
        <title>Announcer - Systems</title>
      </Head>
      <Page {...props} />
    </>
  );
}

export default withAuth(withLayout(SystemsPage));
