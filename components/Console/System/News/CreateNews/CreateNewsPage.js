import React, { useContext } from "react";
import { CreateNewsContext } from "../../../../../store/CreateNewsProvider";

import Layout from "../../Layout/Layout";
import Form from "./Form/Form";
import Preview from "./Preview/Preview";

export default function AllNewsPage(props) {
  const { step } = useContext(CreateNewsContext);
  const Step = () => {
    switch (step) {
      case 1:
        return <Form {...props} />;
      case 2:
        return <Preview {...props}/>;
    }
  };
  return (
    <Layout {...props}>
      <div className="py-5">
        <div className="container pt-2">Create News Page</div>
        <div className="container">{Step()}</div>
      </div>
    </Layout>
  );
}
