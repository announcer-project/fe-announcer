import React, { useContext, useEffect } from "react";
import { Steps } from "antd";
import styled from "styled-components";
import { CreateLineBroadcastContext } from "../../../../store/CreateLineBroadcastProvider";
import Layout from "../Layout/Layout";
import Receiver from "./LineForm/Step1/Step1";
import Message from "./LineForm/Step2/Step2";
import Preview from "./LineForm/Step3/Step3";

const { Step } = Steps;

const StepBar = styled(Steps)`
  .ant-steps-item-process .ant-steps-item-icon {
    border-color: ${(props) => props.theme.color.base};
    background-color: ${(props) => props.theme.color.base};
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background-color: ${(props) => props.theme.color.base};
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background-color: ${(props) => props.theme.color.base};
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    background-color: ${(props) => props.theme.color.base};
  }
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: ${(props) => props.theme.color.base};
  }
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title::after {
    background-color: ${(props) => props.theme.color.base};
  }
  .ant-steps-small .ant-steps-item-title {
    font-size: 12px;
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background-color: ${(props) => props.theme.color.base};
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    background-color: #fff;
    border-color: ${(props) => props.theme.color.base};
  }
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: ${(props) => props.theme.color.base};
  }
  .ant-steps-item-finish
    .ant-steps-item-icon
    > .ant-steps-icon
    .ant-steps-icon-dot {
    border-color: ${(props) => props.theme.color.base};
  }
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title::after {
    border-color: ${(props) => props.theme.color.base};
  }
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    border-color: ${(props) => props.theme.color.base};
  }

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
        return <Receiver />;
      case 2:
        return <Message />;
      default:
        return <Preview systemname={props.query.systemname} />;
    }
  };
  return (
    <div>
      <Layout {...props}>
        <div className="container py-4">
            <h1>Line Broadcast</h1>
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
      </Layout>
    </div>
  );
}
