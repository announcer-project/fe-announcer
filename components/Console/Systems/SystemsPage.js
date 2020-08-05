import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

import Layout from "../Layout/Layout";

const SystemBox = styled.div`
  height: 200px;
  background-color: white;
  cursor: pointer;
  color: black;
  border-radius: 10px;
  padding-top: 80px;
`;

const Background = styled.div`
  background-image: url("/img/bg-systems.jpg");
  background-repeat: repeat-x;
  background-size: auto 250px;
  background-position: center top;
  background-color: white;
`;

function SystemsPage(props) {
  const [systems, setSystems] = useState([]);

  useEffect(() => {
    setSystems(props.systems);
  }, []);

  return (
    <>
      <Layout>
        <Background>
          <div className="container">
            <div className="pt-3 pt-sm-5">
              <p className="font-title" style={{ color: "white" }}>
                <b>All system</b>
              </p>
              <div className="row">
                <div className="col-12 col-sm-4">
                  <Link href="/console/createsystem">
                    <SystemBox className="shadow-sm text-center">
                      <span className="font-large">
                        +<br />
                        Add system
                      </span>
                    </SystemBox>
                  </Link>
                </div>
                {systems.map((system, key) => {
                  return (
                    <div className="col-12 col-sm-4">
                      <SystemBox className="shadow-sm text-center">
                        <span className="font-large">{system.systemname}</span>
                        <br />
                        <span className="font-small color-drop">
                          {system.systemid}
                        </span>
                      </SystemBox>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Background>
      </Layout>
    </>
  );
}

export default SystemsPage;
