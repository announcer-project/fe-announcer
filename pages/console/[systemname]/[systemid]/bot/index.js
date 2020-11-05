import Head from "next/head";
import axios from "axios";
import cookie from "../../../../../tools/cookie";
import withAuth from "../../../../../hoc/withAuth";
import withLayout from "../../../../../hoc/withLayoutConsole";
import { useEffect, useState } from "react";

import AllIntentsPage from "../../../../../components/Console/System/Bot/AllIntent";

function BotPage({ systemname, systemid }) {
  const [loading, setLoading] = useState(true);
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    fetchDialogflow();
  }, []);

  const fetchDialogflow = async () => {
    let connect = await axios.get(
      `${process.env.REACT_APP_BE_PATH}/dialogflow/check?systemid=${systemid}`,
      {
        headers: {
          Authorization: "Bearer " + cookie.getJWT(),
        },
      }
    );
    setConnect(connect);
    setLoading(false);
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
          <>{connect ? <AllIntentsPage /> : <div>false</div>}</>
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
