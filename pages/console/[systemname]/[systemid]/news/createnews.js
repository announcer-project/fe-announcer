import Head from "next/head";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import { CreateNewsProvider } from "../../../../../store/CreateNewsProvider";
import withAuth from "../../../../../hoc/withAuth"
import withLayout from "../../../../../hoc/withLayoutConsole"

import Page from "../../../../../components/Console/System/News/CreateNews/CreateNewsPage";

function CreateNewsPage({ systemname, newstypes }) {
  return (
    <>
      <Head>
        <title>{systemname} - NMS</title>
      </Head>
      <CreateNewsProvider>
        <Page newstypes={newstypes} />
      </CreateNewsProvider>
    </>
  );
}

const setNewsType = (data) => {
  let newstypes = [];
  for (let index = 0; index < data.length; index++) {
    let newstype1 = data[index];
    let newstype2 = {
      id: newstype1.ID,
      name: newstype1.newstype_name,
      selected: false,
    };
    newstypes.push(newstype2);
  }
  return newstypes;
};

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
    .then(async (res) => {
      newstypes = await setNewsType(res.data);
    });
  return newstypes;
};

CreateNewsPage.getInitialProps = async (ctx) => {
  const newstypes = await fetchNewsTypes(ctx);
  return {
    systemname: ctx.query.systemname,
    newstypes,
  };
};

export default withAuth(withLayout(CreateNewsPage))