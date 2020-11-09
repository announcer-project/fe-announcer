import Head from "next/head";
import axios from "axios";
import cookie from "../../../../../../tools/cookie";
import withAuth from "../../../../../../hoc/withAuth";
import withLayout from "../../../../../../hoc/withLayoutConsole";
import { useEffect, useState } from "react";
import { Form, Input } from "../../../../../../components/common/Form";
import Button from "../../../../../../components/common/Button";
import { intent as intentapi } from "../../../../../../api";
import Router from "next/router"

// import AllIntentsPage from "../../../../../../components/Console/System/Bot/AllIntent";

function CreateIntentPage({ systemname, systemid }) {
  const [loading, setLoading] = useState(true);
  const [intentname, setIntentname] = useState("");
  const [training_phrases, setTraining_phrases] = useState([""]);
  const [responses, setResponses] = useState([""]);

  const createIntent = async () => {
    setLoading(false);
    let data = {
      DisplayName: intentname,
      TrainingPhrase: training_phrases,
      MessageTexts: responses,
    };
    console.log(data)
    await intentapi.post(`/intent/create?systemid=${systemid}`, data).then((res) => {
      console.log("Res ", res.data)
      Router.push(`/console/${systemname}/${systemid}/bot`);
    })
  };

  const onChangeTrainingPhrase = (training_phrase, index) => {
    let training_phrases_clone = training_phrases;
    training_phrases_clone[index] = training_phrase;
    setTraining_phrases([...training_phrases_clone]);
  };

  const onChangeResponses = (response, index) => {
    let responses_clone = responses;
    responses_clone[index] = response;
    setResponses([...responses_clone]);
  };

  const addTrainingPhrase = () => {
    let training_phrases_clone = training_phrases;
    training_phrases_clone.push("");
    setTraining_phrases([...training_phrases_clone]);
  };

  const addResponse = () => {
    let responses_clone = responses;
    responses_clone.push("");
    setResponses([...responses_clone]);
  };

  return (
    <React.Fragment>
      <Head>
        <title>{systemname} - Announcer</title>
      </Head>
      <div className="container pt-4">
        <h1>{systemname} bot</h1>
        <Form>
          <div className="container pt-4">
            <h1>Create Intent</h1>
            <div>
              <div className="p-2 border d-flex justify-content-between">
                <Input
                  className="mb-0 mr-2"
                  style={{ width: "100%" }}
                  placeholder="intent name"
                  value={intentname}
                  onChange={(e) => setIntentname(e.target.value)}
                />
                <Button onClick={createIntent}>Save</Button>
              </div>
              <div className="p-2 border mt-2">
                <span>Traing Phrase</span>
                {training_phrases.map((training_phrase, key) => {
                  return (
                    <Input
                      key={key}
                      className="mb-1"
                      style={{ width: "100%" }}
                      placeholder="training"
                      value={training_phrase}
                      onChange={(e) =>
                        onChangeTrainingPhrase(e.target.value, key)
                      }
                    />
                  );
                })}
                <div className="text-center">
                  <Button onClick={addTrainingPhrase}>+</Button>
                </div>
              </div>
              <div className="p-2 border mt-2">
                <span>Response</span>
                {responses.map((response, key) => {
                  return (
                    <Input
                      key={key}
                      className="mb-1"
                      style={{ width: "100%" }}
                      placeholder="response"
                      value={response}
                      onChange={(e) => onChangeResponses(e.target.value, key)}
                    />
                  );
                })}
                <div className="text-center">
                  <Button onClick={addResponse}>+</Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
}

CreateIntentPage.getInitialProps = async (ctx) => {
  return {
    systemname: ctx.query.systemname,
    systemid: ctx.query.systemid,
  };
};

export default withAuth(withLayout(CreateIntentPage));
