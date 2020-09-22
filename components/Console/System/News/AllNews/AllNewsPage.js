import React from "react";
import { useRouter } from "next/router";

import Layout from "../../Layout/Layout";
import AllNewsBox from "./AllNewsBox";

export default function AllNewsPage(props) {
  const allnews = props.allnews;
  const newsdraft = allnews.draft;
  const newspublish = allnews.publish;
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const path = `/console/${systemname}/${systemid}`;

  return (
    <div className="container pt-2">
      <h1>{systemname} - All news</h1>
      <AllNewsBox type="Draft" news={newsdraft} path={path} />
      <AllNewsBox type="Publish" news={newspublish} path={path} />
    </div>
  );
}
