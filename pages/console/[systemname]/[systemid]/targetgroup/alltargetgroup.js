import axios from "axios";
import cookie from "../../../../../tools/cookie";
import { withAuth } from "../../../../../tools/withAuth";
import Page from "../../../../../components/Console/System/TargetGroup/AllTargetGroup/AllTargetGroupPage";

export default function AllTargetGroupPage(props) {
  return <Page {...props} />;
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
  const page = {
    name: "alltargetgroup",
    type: "targetgroup",
  };
  const targetGroups = await fetchTargetGroups(ctx);
  return {
    props: { query: ctx.query, page, targetGroups },
  };
}
