import axios from "axios";
import cookie from "../../../../../tools/cookie";
import Head from "next/head";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";

import Page from "../../../../../components/Console/System/News/CreateNewsType/CreateNewsTypePage";

function CreateNewsTypePage({ systemname, newstypes }) {
  return (
    <>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <Page newsTypes={newstypes} />
    </>
  );
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

CreateNewsTypePage.getInitialProps = async (ctx) => {
  let newstypes = await fetchNewsTypes(ctx);
  return {
    systemname: ctx.query.systemname,
    newstypes,
  };
};

export default withAuth(withLayout(CreateNewsTypePage));
