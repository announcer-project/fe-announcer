import axios from "axios";
import cookie from "../../../../../tools/cookie";

import { withAuth } from "../../../../../tools/withAuth";

import Page from "../../../../../components/Console/System/News/CreateNewsType/CreateNewsTypePage";

export default function CreateNewsTypePage(props) {
  return <Page {...props} />;
}

const fetchNewsTypes = async (ctx) => {
  const query = ctx.query;
  let newstypes = [];
  await axios
    .get(
      `${process.env.REACT_APP_BE_PATH}/news/newstype/all?systemid=${query.systemid}`,
      {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(ctx),
        },
      }
    )
    .then((res) => {
      newstypes = res.data;
    });
  return newstypes;
};

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  const newsTypes = await fetchNewsTypes(ctx);
  return {
    props: { query: ctx.query, console: true, system: true, newsTypes },
  };
}
