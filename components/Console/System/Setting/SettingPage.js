import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";
import Button from "../../../common/Button";
import axios from "axios";
import cookie from "../../../../tools/cookie";
import Skeleton from "react-loading-skeleton";
import {system as systemapi} from "../../../../api"
import Swal from "sweetalert2"

const Systempicture = styled.img`
  width: 177px;
  height: 177px;
  object-fit: cover;
  border-radius: 100px;
`;

const Box = styled.div`
  border: 1px solid #c4c4c4;
  padding: 10px 15px 10px 15px;
  margin-bottom: 15px;
`;

const Text = styled.div`
  color: black;
`;

export default function SettingPage() {
  const router = useRouter();
  const { systemname, systemid } = router.query;
  const [system, setSystem] = useState(null);

  useEffect(() => {
    fetchSystem();
  }, []);

  const fetchSystem = async () => {
    await axios
      .get(`${process.env.REACT_APP_BE_PATH}/system/${systemid}`, {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(),
        },
      })
      .then((res) => {
        setSystem(res.data);
      });
  };

  const deleteSystem = async () => {
    await systemapi.delete(`/${systemid}`).then((res) => {
      Router.push("/console/systems");
    })
  }

  return (
    <div className="container py-4">
      <h1>Setting</h1>
      {system ? (
        <>
          <div className="text-center pt-3">
            <Systempicture
              src={`${process.env.REACT_APP_STORAGE}/systems/${system.ID}.png`}
            />
            <div className="pt-5">System name: {system.system_name}</div>
            <div className="pt-3 pb-5">System ID: {system.ID}</div>
          </div>
          <Link
            href={`/console/[systemname]/[systemid]/setting/admin?systemname=${systemname}&systemid=${systemid}`}
            as={`/console/${systemname}/${systemid}/setting/admin`}
          >
            <Box>
              <a>
                <div className="d-flex justify-content-between">
                  <Text>Setting admin</Text>
                  <Text>
                    <RightOutlined />
                  </Text>
                </div>
              </a>
            </Box>
          </Link>
          <div className="pt-3">
            <h1 className="pb-2">Delete this system</h1>
            <Button onClick={deleteSystem} danger={true}>Delete</Button>
          </div>
        </>
      ) : (
        <>
          <div className="text-center pt-3">
            <Skeleton height={177} width={177} circle={true} />
            <Skeleton />
            <Skeleton />
          </div>
          <Skeleton height={50} />
        </>
      )}
    </div>
  );
}
