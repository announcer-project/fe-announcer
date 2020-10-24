import React from "react";
import { useRouter } from "next/router";

import Layout from "../../Layout/Layout";
import AllNewsBox from "./AllNewsBox";

export default function AllNewsPage({ allnews }) {
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const path = `/console/${systemname}/${systemid}`;

  return (
    <div className="container pt-2">
      <h1>{systemname} - All news</h1>
      {allnews ? (
        <div>
          <AllNewsBox type="Draft" news={allnews.draft} path={path} />
          <AllNewsBox type="Publish" news={allnews.publish} path={path} />
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
