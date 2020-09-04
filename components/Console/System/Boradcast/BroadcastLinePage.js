import React, { useContext, useEffect } from "react";
import { Steps } from "antd";
import styled from "styled-components";
import { CreateLineBroadcastContext } from "../../../../store/CreateLineBroadcastProvider";
import Layout from "../Layout/Layout";
import Receiver from "./LineForm/Step1/Step1";
import Message from "./LineForm/Step2/Step2";
import Preview from "./LineForm/Step3/Step3";

import "./Step.module.css";

const { Step } = Steps;

const StepBar = styled(Steps)`
  .anticon {
    vertical-align: 0em;
  }
`;

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
        <div className="container py-3 py-sm-5">
          <div className="shadow-lg border-radius-small p-3 p-sm-5">
            <p className="font-title mb-0">Line Broadcast</p>
            <div className="pt-4">
              <div id="StepBroadcast" className="col-12 col-sm-8 mx-auto">
                <StepBar size="small" current={step - 1}>
                  <Step title="Receiver" />
                  <Step title="Message" />
                  <Step title="Preview" />
                </StepBar>
              </div>
              <div className="mt-2 mt-sm-4 px-0 px-sm-3">{StepForm(props)}</div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
