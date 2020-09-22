import axios from "axios";
import cookie from "../../../../../tools/cookie";
import { withAuth } from "../../../../../tools/withAuth";
import Page from "../../../../../components/Console/System/Role/RoleRequest/RoleRequest";
import Head from "next/head";

export default function RoleRequestPage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>{props.query.systemname} - NMS</title>
      </Head>
      <Page {...props} />
    </React.Fragment>
  );
}

const fetchTargetGroups = async (ctx) => {
  let targetgroups = [];
  const query = ctx.query;
  await axios
    .get(
      `${process.env.REACT_APP_BE_PATH}/targetgroup/all?systemid=${query.systemid}&systemname=${query.systemname}`,
      {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(ctx),
        },
      }
    )
    .then((res) => {
      targetgroups = res.data;
    });
  return targetgroups;
};

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  //   const targetGroups = await fetchTargetGroups(ctx);
  return {
    props: { query: ctx.query, console: true, system: true },
  };
}
