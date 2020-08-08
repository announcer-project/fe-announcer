import React from "react";
import styled from "styled-components";

export default function NewsTypes({ newstypes }) {
  return (
    <div className="p-3">
      <span className="font-large">News type</span>
      <div style={{ borderBottom: "2px solid #050042" }}></div>
      {newstypes.length === 0 ? (
        <div className="border p-5 text-center font-small color-drop mt-2">
          Not have news type
        </div>
      ) : (
        <div className="col-12">
          <div className="row">
            {newstypes.map((newstype) => {
              return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-2">
                  <div className="shadow-sm border rounded">
                    <div className="pt-5 text-center">
                      {newstype.newstype_name}
                    </div>
                    <div className="text-right pt-4 px-4 pb-2 font-small color-drop">
                      {newstype.number_news} news
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
