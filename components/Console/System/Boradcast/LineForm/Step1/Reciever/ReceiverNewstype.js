import React, { useContext, useState } from "react";
import { Checkbox } from "antd";
import { NewsTypeBox } from "./Components";
import { CreateLineBroadcastContext } from "../../../../../../../store/CreateLineBroadcastProvider";

export default function NewsTypeSelector() {
  const { newstypes, selectNewsTypes } = useContext(CreateLineBroadcastContext);
  const { checknewstypes, checkNewsTypes } = useContext(CreateLineBroadcastContext);

  const onSelectNewsType = (key) => {
    let newnewstypes = newstypes;
    newnewstypes[key].selected = !newnewstypes[key].selected;
    selectNewsTypes(newnewstypes);
  };
  
  return (
    <div>
      <Checkbox checked={checknewstypes} onChange={() => checkNewsTypes(checknewstypes)}>
        News type
      </Checkbox>
      <div className="pl-2 mt-2">
        {newstypes.map((newstype, key) => {
          return (
            <NewsTypeBox
              key={key}
              className="ml-3 d-inline-block font-small"
              selected={newstype.selected}
              checked={checknewstypes}
              onClick={() => {
                checknewstypes ? onSelectNewsType(key) : "";
              }}
            >
              {newstype.newstypename}
            </NewsTypeBox>
          );
        })}
      </div>
    </div>
  );
}
