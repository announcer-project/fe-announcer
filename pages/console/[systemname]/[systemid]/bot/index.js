import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";
import { useEffect, useState } from "react";
import { intent as dialogflowapi } from "../../../../../api";
import styled from "styled-components";
import Button from "../../../../../components/common/Button";

import AllIntentsPage from "../../../../../components/Console/System/Bot/AllIntent";

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

function BotPage({ systemname, systemid }) {
  const [loading, setLoading] = useState(true);
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    fetchDialogflow();
  }, []);

  const fetchDialogflow = async () => {
    await dialogflowapi.get(`/check?systemid=${systemid}`).then((res) => {
      setConnect(res.data);
      setLoading(false);
    });
  };

  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <div className="container pt-4">
        <h1>{systemname} bot</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {connect ? (
              <AllIntentsPage setConnect={setConnect} />
            ) : (
              <div>
                <Box>
                  <div className="d-flex justify-content-between">
                    <div>
                      <img width="40px" src="/img/Login/Dialogflow.png" />
                      <span className="mt-2 ml-2">Dialogflow</span>
                    </div>
                    <div>
                      <Link
                        href={`/console/[systemname]/[systemid]/bot/connect?systemname=${systemname}&systemid=${systemid}`}
                        as={`/console/${systemname}/${systemid}/bot/connect`}
                      >
                        <a>
                          <Button>Connect API</Button>
                        </a>
                      </Link>
                    </div>
                  </div>
                </Box>
              </div>
            )}
          </>
        )}
      </div>
    </React.Fragment>
  );
}

BotPage.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
    systemid: ctx.query.systemid,
  };
};

export default withAuth(withLayout(BotPage));
