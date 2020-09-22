import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

import Layout from "../Layout/Layout";

const Box = styled.div`
  background-color: ${(props) => props.theme.color.base};
  color: white;
  cursor: pointer;
  border-radius: 50px;
`;

const Logo = styled.img`
  width: 35px;
`;

export default function BroadcastPage() {
  const router = useRouter();
  const { systemid, systemname } = router.query;
  return (
    <div className="container py-4">
      <h1>Broadcast</h1>
      <div className="row">
        <div className="col-12 col-sm-6 px-3 pt-3">
          <Link href={`/console/${systemname}/${systemid}/broadcast/line`}>
            <Box className="text-center py-2">
              <Logo className="mr-3" src="/img/Login/Line.png" />
              <h2 className="text-light d-inline-block">
                Line Official Account
              </h2>
            </Box>
          </Link>
        </div>
        <div className="col-12 col-sm-6 px-3 pt-3">
          <Link href={`/console/${systemname}/${systemid}/broadcast/line`}>
            <Box className="text-center py-2">
              <Logo className="mr-3" src="/img/Login/Facebook.png" />
              <h2 className="text-light d-inline-block">Facebook Page</h2>
            </Box>
          </Link>
        </div>
      </div>
    </div>
  );
}
