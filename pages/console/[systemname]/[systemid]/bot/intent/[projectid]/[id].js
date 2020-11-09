import Head from "next/head";
import axios from "axios";
import cookie from "../../../../../../../tools/cookie";
import withAuth from "../../../../../../../hoc/withAuth";
import withLayout from "../../../../../../../hoc/withLayoutConsole";
import { useEffect, useState } from "react";
import { intent as intentapi } from "../../../../../../../api";
import Button from "../../../../../../../components/common/Button";

// import AllIntentsPage from "../../../../../components/Console/System/Bot/AllIntent";

function IntentPage({ systemname, systemid, projectid, intentid }) {
  const [loading, setLoading] = useState(true);
  const [intent, setIntent] = useState(null);

  useEffect(() => {
    fetchIntent();
  }, []);

  const fetchIntent = async () => {
    let intent = await intentapi.get(
      `/intent/${projectid}/${intentid}?systemid=${systemid}`
    );
    setIntent(intent.data);
    console.log("intent", intent);
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <div className="container pt-4">
        <h1>Intent</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="p-2 border d-flex justify-content-between">
              <span className="mt-2">{intent.display_name}</span>
              <Button>Save</Button>
            </div>
            <div className="p-2 border mt-2">
              <span>Traing Phrase</span>
              {intent.is_fallback ? (
                <></>
              ) : (
                <>
                  {intent.training_phrases.map((trining_phrase, key) => {
                    let text = trining_phrase.parts[0].text;
                    return (
                      <div key={key} className="border p-2 mb-1">
                        {text}
                      </div>
                    );
                  })}
                  <div className="text-center">
                    <Button>+</Button>
                  </div>
                </>
              )}
            </div>
            <div className="p-2 border mt-2">
              <span>Response</span>
              {intent.messages[0].Message.Text.text ? (
                <>
                  {intent.messages[0].Message.Text.text.map((text, key) => {
                    return (
                      <div key={key} className="border p-2 mb-1">
                        {text}
                      </div>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
              <div className="text-center">
                <Button>+</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

IntentPage.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
    systemid: ctx.query.systemid,
    projectid: ctx.query.projectid,
    intentid: ctx.query.id,
  };
};

export default withAuth(withLayout(IntentPage));
