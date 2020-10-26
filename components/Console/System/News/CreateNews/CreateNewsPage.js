import React, { useContext, useEffect, useState } from "react";
import { CreateNewsContext } from "../../../../../store/CreateNewsProvider";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import { useRouter } from "next/router";

import Form from "./Form/Form";
import Preview from "./Preview/Preview";
import Skeleton from "./Skeleton"

export default function AllNewsPage() {
  const { step } = useContext(CreateNewsContext);

  const router = useRouter();
  const { systemname, systemid } = router.query;
  const [newstypes, setNewstypes] = useState(null);

  const Step = () => {
    switch (step) {
      case 1:
        return <Form newstypes={newstypes} />;
      case 2:
        return <Preview />;
    }
  };

  useEffect(() => {
    fetchNewsTypes();
  }, []);

  const setNewsType = (data) => {
    let newstypes = [];
    for (let index = 0; index < data.length; index++) {
      let newstype1 = data[index];
      let newstype2 = {
        id: newstype1.ID,
        name: newstype1.newstype_name,
        selected: false,
      };
      newstypes.push(newstype2);
    }
    return newstypes;
  };

  const fetchNewsTypes = () => {
    axios
      .get(
        `${process.env.REACT_APP_BE_PATH}/news/newstype/all?systemid=${systemid}`,
        {
          headers: {
            Authorization: "Bearer " + cookie.getJWT(),
          },
        }
      )
      .then(async (res) => {
        setNewstypes(setNewsType(res.data));
      });
  };

  return (
    <div className="container mt-3 mb-5">
      <h1>Create News Page</h1>
      {newstypes ? <div className="mt-3">{Step()}</div> : <div><Skeleton /></div>}
    </div>
  );
}
