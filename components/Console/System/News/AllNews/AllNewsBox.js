import Link from "next/link";
import styled from "styled-components";
import NewsDraftCard from "../../NewsDraftCard";
import NewsPublishCard from "../../NewsPublishCard";

const BoxAllNews = styled.div`
  background-color: ${(props) =>
    props.type === "Draft" ? props.theme.color.base : "white"};
`;

export default function AllNewsBox(props) {
  const path = props.path;
  const type = props.type;
  const news = props.news;

  const createMarkup = (body) => {
    return { __html: body };
  };

  return (
    <BoxAllNews type={type} className={`col-12 p-3 px-5 rounded mt-3 ${type === "Draft" ? "" : "border"}`}>
      <span className={`font-large ${type === "Draft" ? "text-light" : ""} `}>
        {type}
      </span>
      <div className="row">
        {news.map((news, key) => {
          if (type === "Draft") {
            return <NewsDraftCard className="col-12 col-lg-4" news={news} />;
          } else {
            return <Link href={`/news/systemname/systemid/${news.ID}`}><NewsPublishCard className="col-12 col-lg-4" news={news} /></Link>;
          }
        })}
      </div>
    </BoxAllNews>
  );
}
