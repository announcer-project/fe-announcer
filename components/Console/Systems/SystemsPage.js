import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

import Layout from "../Layout/Layout";
import LoadingPage from "../../Loading";

const SystemBox = styled.div`
  height: 150px;
  background-color: white;
  cursor: pointer;
  color: black;
`;
const Background = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    to top,
    white 0%,
    white 60%,
    #050042 60%,
    #050042 100%
  );
`;

function SystemsPage(props) {
  const [systems, setSystems] = useState([]);

  useEffect(() => {
    setSystems(props.systems)
  }, []);

  return (
    <>
      <Layout>
        <Background>
          <div className="container pt-5">
            <div className="col-10 mx-auto">
              <div className="col-12 pt-5">
                <h3 className="text-light">All systems</h3>
                <div className="row">
                  <div className="col-4 p-2">
                    <Link href="/console/systems/create">
                      <SystemBox className="p-3 rounded shadow-sm text-center pt-5">
                        <h5>
                          +<br />
                          Add System
                        </h5>
                      </SystemBox>
                    </Link>
                  </div>
                  {systems.map((system) => {
                    return (
                      <div className="col-4 p-2">
                        <Link href={`/console/${system.SystemName}/${system.ID}/home`}>
                          <SystemBox className="p-3 rounded shadow-sm text-center pt-5">
                            <h5 className="pt-3">{system.SystemName}</h5>
                          </SystemBox>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Background>
      </Layout>
    </>
  );
}

export default SystemsPage;
