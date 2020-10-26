import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

const Card = styled.div`
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
`;

export function NewsLoading() {
  let news = [{}, {}, {}];
  return (
    <div className="border rounded p-3 mt-3 ">
      <div className="d-flex justify-content-between">
        <span className="font-large">News</span>
      </div>
      <div className="col-12 mt-2">
        <div className="row">
          {news.map(() => {
            return (
              <div className="col-12 col-lg-4">
                <Card className="shadow-sm ">
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
      </div>
    </div>
  );
}

export function NewsTypesLoading() {
  let newstypes = [{}, {}, {}, {}];
  return (
    <div className="p-3">
      <span className="font-large">News type</span>
      <div style={{ borderBottom: "2px solid #050042" }}></div>
      <div className="col-12">
        <div className="row">
          {newstypes.map((newstype) => {
            return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-2">
                <div className="shadow-sm border rounded">
                  <div className="pt-5 px-4 text-center">
                    <Skeleton />
                  </div>
                  <div className="text-right pt-4 px-4 pb-2 font-small color-drop">
                    <Skeleton />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function TargetgroupsLoading() {
  let targetgroups = [{}, {}, {}, {}];
  return (
    <div className="p-3">
      <span className="font-large">Targetgroups</span>
      <div style={{ borderBottom: "2px solid #050042" }}></div>
      <div className="col-12">
        <div className="row">
          {targetgroups.map(() => {
            return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-2">
                <div className="col-12 border rounded shadow-sm px-2 px-sm-3 px-lg-5 py-4">
                  <div className="row">
                    <div className="col-5 text-right">
                      <Skeleton height={30} />
                    </div>
                    <div className="col-7">
                      <Skeleton/>
                      <Skeleton/>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
