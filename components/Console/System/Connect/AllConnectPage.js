import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/common/Button";
import { useRouter } from "next/router";
import { LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import cookie from "../../../../tools/cookie"

const Box = styled.div`
  border: 1px solid #a6a6a6;
  cursor: pointer;
  padding: 22px;
  margin-bottom: 10px;
`;

const BoxSocial = styled.div`
  display: inline-block;
  padding: 6px;
  margin-right: 5px;
  background: ${(props) => (props.line ? "#00B900" : "#3B5998")};
  border-radius: 8px;
`;

export default function AllConnectPage({ lineConnected, facebookConnected }) {
  console.log("lineConnected", lineConnected);
  const router = useRouter();
  const { systemid, systemname } = router.query;
  const [lineConnect, setLineConnect] = useState(lineConnected);
  const [loading, setLoading] = useState(false);

  const disconnectLineOA = () => {
    setLoading(true);
    axios
      .delete(`${process.env.REACT_APP_BE_PATH}/connect/line/${systemid}`, {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(),
        },
      })
      .then((res) => {
        setLineConnect(false);
        setLoading(false);
      });
  };

  return (
    <div className="container pt-4">
      <h1>Connect social api</h1>
      <Box>
        <div className="d-flex justify-content-between">
          <div>
            <BoxSocial line={true}>
              <img width="24px" src="/img/Login/Line.png" />
            </BoxSocial>
            <span className="mt-2">Line Official Account</span>
          </div>
          <div>
            <Link href={`/console/${systemname}/${systemid}/connect/line`}>
              <Button className={`${lineConnect ? "d-none" : ""}`}>
                Connect API
              </Button>
            </Link>
            <Button
              onClick={disconnectLineOA}
              className={`${lineConnect ? "" : "d-none"}`}
              danger={true}
            >
              <LoadingOutlined className={`${loading ? "" : "d-none"}`} />{" "}
              Disconnect
            </Button>
          </div>
        </div>
      </Box>
      <Box>
        <div className="d-flex justify-content-between">
          <div>
            <BoxSocial line={false}>
              <img width="24px" src="/img/Login/Facebook.png" />
            </BoxSocial>
            <span className="mt-2">Facebook Page</span>
          </div>
          <div>
            <Link href={`/console/${systemname}/${systemid}/connect/facebook`}>
              <Button className={`${facebookConnected ? "d-none" : ""}`}>
                Connect API
              </Button>
            </Link>
            <Button
              className={`${facebookConnected ? "" : "d-none"}`}
              danger={true}
            >
              Disconnect
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}
