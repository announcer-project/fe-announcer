import React, { useContext } from "react";
import { CreateNewsContext } from "../../../../../store/CreateNewsProvider";

import Form from "./Form/Form";
import Preview from "./Preview/Preview";

export default function AllNewsPage({ newstypes }) {
  const { step } = useContext(CreateNewsContext);
  const Step = () => {
    switch (step) {
      case 1:
        return <Form newstypes={newstypes} />;
      case 2:
        return <Preview />;
    }
  };

  return (
    <div className="container mt-3 mb-5">
      <h1>Create News Page</h1>
      <div className="mt-3">{Step()}</div>
    </div>
  );
}
