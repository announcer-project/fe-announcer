import React from "react";
import Link from "next/link";
import styled from "styled-components";

import Layout from "../Layout/Layout";

const Box = styled.div`
  background-color: #050042;
  color: white;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 10%;
`;

export default function BroadcastPage(props) {
  const query = props.query;
  return (
    <div>
      <Layout {...props}>
        <div className="container py-3 py-sm-5">
          <div className="shadow-lg border-radius-small p-3 p-sm-5">
            <p className="font-title mb-0">Broadcast</p>
            <div className="row">
              <div className="col-12 col-sm-6 px-3 pt-3">
                <Link
                  href={`/console/${query.systemname}/${query.systemid}/broadcast/line`}
                >
                  <Box className="text-center py-3 px-3 rounded">
                    <Logo className="mr-3" src="/img/Login/Line.png" />
                    Line Official Account
                  </Box>
                </Link>
              </div>
              <div className="col-12 col-sm-6 px-3 pt-3">
                <Link
                  href={`/console/${query.systemname}/${query.systemid}/broadcast/line`}
                >
                  <Box className="text-center py-3 px-3 rounded">
                    <Logo className="mr-3" src="/img/Login/Facebook.png" />
                    Facebook Page
                  </Box>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
