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
            return (
              <div key={key} className="border p-2 mb-1 d-flex justify-content-between">
                <span className="mt-2">{intent.display_name}</span>
                <Button>Manage</Button>
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
