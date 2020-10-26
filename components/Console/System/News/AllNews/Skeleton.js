import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

const Card = styled.div`
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
`;

const BoxAllNews = styled.div`
  background-color: ${(props) =>
    props.type === "Draft" ? props.theme.color.base : "white"};
`;

export default function NewsLoading() {
  let news = [{}, {}, {}];
  return (
    <div>
      <BoxAllNews type={"Draft"} className={`col-12 p-3 px-5 rounded mt-3`}>
        <span className={`font-large text-light`}>Draft</span>
        <div className="row">
          {news.map((n, key) => {
            return (
              <div key={key} className="col-12 col-lg-4">
                <Card className="shadow-sm bg-light">
                  <Skeleton height={100} />
                  <div className="px-2">
                    <span>
                      <p>
                        <Skeleton />
                      </p>
                    </span>
                    <div className="mt-1">
                      <div>
                        <p>
                          <Skeleton />
                          <Skeleton />
                          <Skeleton />
                        </p>
                      </div>
                    </div>
                    <div className="mt-1">
                      <Skeleton />
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </BoxAllNews>
      <BoxAllNews type={"Publish"} className={`col-12 p-3 px-5 rounded mt-3 border`}>
        <span className={`font-large`}>Publish</span>
        <div className="row">
          {news.map((n, key) => {
            return (
              <div key={key} className="col-12 col-lg-4">
                <Card className="shadow-sm">
                  <Skeleton height={100} />
                  <div className="px-2">
                    <span>
                      <p>
                        <Skeleton />
                      </p>
                    </span>
                    <div className="mt-1">
                      <div>
                        <p>
                          <Skeleton />
                          <Skeleton />
                          <Skeleton />
                        </p>
                      </div>
                    </div>
                    <div className="mt-1">
                      <Skeleton />
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </BoxAllNews>
    </div>
  );
}
