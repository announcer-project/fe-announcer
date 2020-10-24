import Head from "next/head";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";

import Page from "../../../../../components/Console/System/News/AllNews/AllNewsPage";

function AllNewsPage({ systemname, allnews }) {
  return (
    <>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <Page allnews={allnews} />
    </>
  );
}

const fetchAllNews = async (ctx) => {
  const query = ctx.query;
  let allnews = [];
  await axios
    .get(
      `${process.env.REACT_APP_BE_PATH}/news/all?systemid=${query.systemid}`,
      {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(ctx),
        },
      }
    )
    .then((res) => {
      allnews = res.data;
    })
    .catch((err) => {
      console.log("err ", err);
    });
  return allnews;
};

AllNewsPage.getInitialProps = async (ctx) => {
  const allnews = await fetchAllNews(ctx);
  return {
    allnews,
    systemname: ctx.query.systemname,
  };
};

export default withAuth(withLayout(AllNewsPage));
