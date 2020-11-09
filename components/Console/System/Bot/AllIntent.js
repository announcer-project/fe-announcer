import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import cookie from "../../../../tools/cookie";
import Skeleton from "react-loading-skeleton";
import Button from "../../../common/Button";
// import styled from "styled-components"

// const IntentBar = styled.div`

// `

export default function AllConnectPage() {
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const [loading, setLoading] = useState(false);
  const [intents, setIntents] = useState(null);

  useEffect(() => {
    fetchAllIntent();
  }, []);

  const fetchAllIntent = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BE_PATH}/dialogflow/intent/list?systemid=${systemid}`,
        {
          headers: {
            Authorization: "Bearer " + cookie.getJWT(),
          },
        }
      )
      .then((res) => {
        setIntents(res.data);
      });
  };

  return (
    <div>
      <div className="mb-3 d-flex justify-content-between">
        <h2 className="mt-2">Intents</h2>
        <Button>Create Intent</Button>
      </div>
      {intents ? (
        <div>
          {intents.map((intent, key) => {
            let projectid = intent.name.split("/")[1];
            let id = intent.name.split("/")[4];
            return (
              <div
                key={key}
                className="border p-2 mb-1 d-flex justify-content-between"
              >
                <span className="mt-2">{intent.display_name}</span>
                <Link
                  href={`bot/intent/[projectid]/[id]?projectid=${projectid}&id=${id}`}
                  as={`bot/intent/${projectid}/${id}`}
                >
                  <a>
                    <Button>Manage</Button>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
