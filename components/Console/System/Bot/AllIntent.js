import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import cookie from "../../../../tools/cookie";
import Skeleton from "react-loading-skeleton";
import Button from "../../../common/Button";
import { intent as dialogflowapi } from "../../../../api";
import Swal from "sweetalert2"

export default function AllConnectPage({ setConnect }) {
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

  const disconnect = async () => {
    setLoading(true);
    Swal.fire({
      title: "You want to disconnect dialogflow ?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        await dialogflowapi
          .delete(`/disconnect?systemid=${systemid}`)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Delete success",
              showConfirmButton: true,
              timer: 3000,
            }).then(() => {
              setConnect(false);
              setLoading(false);
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Delete fail",
              showConfirmButton: true,
              timer: 3000,
            }).then(() => {
              setLoading(false);
            });
          });
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <div>
      <div className="mb-3 d-flex justify-content-between">
        <h2 className="mt-2">Intents</h2>
        <div>
          <Button danger={true} className="mr-2" onClick={disconnect}>
            Disconnect
          </Button>
          <Link
            href={`/console/[systemname]/[systemid]/bot/intent/create?systemname=${systemname}&systemid=${systemid}`}
            as={`/console/${systemname}/${systemid}/bot/intent/create`}
          >
            <a>
              <Button>Create Intent</Button>
            </a>
          </Link>
        </div>
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
