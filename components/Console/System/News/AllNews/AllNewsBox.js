import Link from "next/link";
import styled from "styled-components";
import NewsDraftCard from "../../NewsDraftCard";
import NewsPublishCard from "../../NewsPublishCard";
import { useRouter } from "next/router";
import { Empty } from "antd";
import Button from "../../../../common/Button";

const BoxAllNews = styled.div`
  background-color: ${(props) =>
    props.type === "Draft" ? props.theme.color.base : "white"};
`;

export default function AllNewsBox(props) {
  const type = props.type;
  const news = props.news;
  const router = useRouter();
  const { systemname, systemid } = router.query;

  return (
    <BoxAllNews
      type={type}
      className={`col-12 p-3 px-5 rounded mt-3 ${
        type === "Draft" ? "" : "border"
      }`}
    >
      <span className={`font-large ${type === "Draft" ? "text-light" : ""} `}>
        {type}
      </span>
      <div className="row">
        {news.length === 0 ? (
          <div
            className="col-12 border py-4 mt-2 rounded"
            style={{ backgroundColor: "white" }}
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Not have news"
            >
              <Link
                href={`/console/[systemname]/[systemid]/news/createnews?systemname=${systemname}&systemid=${systemid}`}
                as={`/console/${systemname}/${systemid}/news/createnews`}
              >
                <Button>Create news</Button>
              </Link>
            </Empty>
          </div>
        ) : (
          <>
            {news.map((news, key) => {
              if (type === "Draft") {
                return (
                  <NewsDraftCard className="col-12 col-lg-4" news={news} />
                );
              } else {
                return (
                  <Link href={`/news/${systemname}/${systemid}/${news.ID}`}>
                    <NewsPublishCard className="col-12 col-lg-4" news={news} />
                  </Link>
                );
              }
            })}
          </>
        )}
      </div>
    </BoxAllNews>
  );
}
