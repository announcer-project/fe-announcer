import Head from "next/head";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import { withAuth } from "../../../../../tools/withAuth";
import { CounterProvider } from "../../../../../store/CouterProvider";
import { CreateNewsProvider } from "../../../../../store/CreateNewsProvider";
import Page from "../../../../../components/Console/System/News/CreateNews/CreateNewsPage";

export default function CreateNewsPage(props) {
  return (
    <>
      <Head>
        <title>{props.query.systemname} - NMS</title>
      </Head>
      <CreateNewsProvider>
        <CounterProvider>
          <Page {...props} />
        </CounterProvider>
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
      newstype: newstype1.NewsTypeName,
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
      `${process.env.REACT_APP_BE_PATH}/news/newstype/allnewstype?systemid=${query.systemid}&systemname=${query.systemname}`,
      {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(ctx),
        },
      }
    )
    .then(async (res) => {
      if (res.data) {
        newstypes = await setNewsType(res.data);
      }
    });
  return newstypes;
};

export async function getServerSideProps(ctx) {
  await withAuth(ctx);
  const page = {
    name: "createnews",
    type: "news",
  };
  const newsTypes = await fetchNewsTypes(ctx);
  return {
    props: { query: ctx.query, page, newsTypes },
  };
}
