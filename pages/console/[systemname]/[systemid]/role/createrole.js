import axios from "axios";
import cookie from "../../../../../tools/cookie";
import { withAuth } from "../../../../../tools/withAuth";
import Page from "../../../../../components/Console/System/Role/CreateRole/CreateRolePAge";
import Head from "next/head";

export default function CreateRolePage(props) {
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
    props: { query: ctx.query },
  };
}
