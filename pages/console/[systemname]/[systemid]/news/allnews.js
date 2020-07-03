import Head from "next/head";
import axios from 'axios'
import cookie from "../../../../../tools/cookie";
import { withAuth } from "../../../../../tools/withAuth";

import Page from "../../../../../components/Console/System/News/AllNews/AllNewsPage";

export default function AllNewsPage(props) {
  return (
    <>
      <Head>
        <title>{props.query.systemname} - NMS</title>
      </Head>
      <Page {...props} />
    </>
  );
}

const fetchAllNews = async (ctx) => {
  const query = ctx.query;
  let allnews = [];
  await axios
    .get(
      `${process.env.REACT_APP_BE_PATH}/news/all/classify?systemid=${query.systemid}`,
      {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(ctx),
        },
      }
    )
    .then((res) => {
      allnews = res.data;
    });
  return allnews;
};

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  const page = {
    name: "allnews",
    type: "news",
  };
  const allnews = await fetchAllNews(ctx);
  return {
    props: { query: ctx.query, page, allnews },
  };
}
