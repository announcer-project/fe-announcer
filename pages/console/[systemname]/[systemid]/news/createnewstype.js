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
  const page = {
    name: "createnewstype",
    type: "news",
  };
  const newsTypes = await fetchNewsTypes(ctx);
  return {
    props: { query: ctx.query, page, newsTypes },
  };
}
