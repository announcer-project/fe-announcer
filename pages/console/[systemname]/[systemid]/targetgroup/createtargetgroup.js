import { withAuth } from "../../../../../tools/withAuth";

import Page from "../../../../../components/Console/System/TargetGroup/CreateTargetGroup/CreateTargetGroupPage";

export default function CreateTargetGroupPage(props) {
  return <Page {...props} />;
}

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  const page = {
    name: "createtargetgroup",
    type: "targetgroup",
  };
  //   const targetGroups = await fetchTargetGroups(ctx);
  return {
    props: { query: ctx.query, page },
  };
}
