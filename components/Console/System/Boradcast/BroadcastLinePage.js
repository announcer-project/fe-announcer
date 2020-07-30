import React, { useContext, useEffect } from "react";
import { Steps } from "antd";
import { CreateLineBroadcastContext } from "../../../../store/CreateLineBroadcastProvider";
import Layout from "../Layout/Layout";
import Receiver from "./LineForm/Step1/Step1";
import Message from "./LineForm/Step2/Step2";
import Preview from "./LineForm/Step3/Step3";

import "./Step.module.css";

const { Step } = Steps;

export default function BroadcastLinePage(props) {
  const {
    selectNewsTypes,
    selectTargetGroups,
    selectUsers,
    setNews,
    step,
  } = useContext(CreateLineBroadcastContext);
  const newstypes = props.aboutLineBroadcast.newstypes;
  const targetgroups = props.aboutLineBroadcast.targetgroups;
  const users = props.aboutLineBroadcast.users;
  const news = props.aboutLineBroadcast.news;

  useEffect(() => {
    selectNewsTypes(newstypes);
    selectTargetGroups(targetgroups);
    selectUsers(users);
    setNews(news);
  }, []);

  const StepForm = (props) => {
    switch (step) {
      case 1:
        return (
          <Receiver
            systemname={props.query.systemname}
            systemid={props.query.systemid}
          />
        );
      case 2:
        return <Message />;
      default:
        return <Preview systemname={props.query.systemname} />;
    }
  };
  return (
    <div>
      <Layout {...props}>
        <div className="p-5">
          <div className="container shadow-lg border-radius-small p-5">
            <p className="font-title mb-0">Line Broadcast</p>
            <div className="container pt-3">
              <div id="StepBroadcast" className="col-8 mx-auto">
                <Steps size="small" current={step - 1}>
                  <Step title="Receiver" />
                  <Step title="Message" />
                  <Step title="Preview" />
                </Steps>
              </div>
              <div className="pt-3 px-5">{StepForm(props)}</div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
