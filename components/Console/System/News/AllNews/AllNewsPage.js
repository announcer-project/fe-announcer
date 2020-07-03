import React from "react";

import Layout from "../../Layout/Layout";
import AllNewsBox from "./AllNewsBox";

export default function AllNewsPage(props) {
  const allnews = props.allnews;
  const newsdraft = allnews.newsdraft;
  const newspublish = allnews.newspublish;
  const path = `/console/${props.query.systemname}/${props.query.systemid}`;

  return (
    <Layout {...props}>
      <div className="container pt-2">
        <h3>{props.query.systemname} - All news</h3>
        <AllNewsBox type="Draft" news={newsdraft} path={path} />
        <AllNewsBox type="Publish" news={newspublish} path={path} />
      </div>
    </Layout>
  );
}
