import { withAuth } from "../../../../../tools/withAuth";
import axios from "axios"
import cookie from "../../../../../tools/cookie"

import Page from "../../../../../components/Console/System/TargetGroup/CreateTargetGroup/CreateTargetGroupPage";

export default function CreateTargetGroupPage(props) {
  return <Page {...props} />;
}

const fetchMembers = async (ctx) => {
  let members = [];
  const query = ctx.query;
  await axios
    .get(
      `${process.env.REACT_APP_BE_PATH}/member/all?systemid=${query.systemid}`,
      {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(ctx),
        },
      }
    )
    .then((res) => {
      members = res.data;
    });
  return members;
};

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  const targetGroups = await fetchMembers(ctx);
  return {
    props: { query: ctx.query, targetGroups },
  };
}
