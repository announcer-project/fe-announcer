import React, { useContext, useEffect } from "react";
import Step from "../../../common/Step";
import styled from "styled-components";
import { CreateLineBroadcastContext } from "../../../../store/CreateLineBroadcastProvider";
import Receiver from "./LineForm/Step1/Step1";
import Message from "./LineForm/Step2/Step2";
import Preview from "./LineForm/Step3/Step3";

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
        return <Receiver />;
      case 2:
        return <Message />;
      default:
        return <Preview systemname={props.query.systemname} />;
    }
  };
  return (
    <div>
      <div className="container py-4">
        <h1>Line Broadcast</h1>
        <div className="pt-4">
          <div id="StepBroadcast" className="col-12 col-sm-8 mx-auto">
            <Step
              StepShow={[
                { title: "Reciver" },
                { title: "Message" },
                { title: "Preview" },
              ]}
              now={step}
              size="small"
            />
          </div>
          <div className="mt-2 mt-sm-4 px-0 px-sm-3">{StepForm(props)}</div>
        </div>
      </div>
    </div>
  );
}
