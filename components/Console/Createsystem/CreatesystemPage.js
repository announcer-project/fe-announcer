import { Steps } from "antd";
import React, { useContext } from "react";
import { CreatesystemContext } from "../../../store/CreatesystemProvider";
import styled from "styled-components";
import Layout from "../Layout/Layout";
import Step1 from "./Step1";
import Step2 from  "./Step2";
import Step4 from  "./Step4";

import "./Step.module.css";
import "./Form.module.css";

const Box = styled.div`
  border: 2px solid white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
`;

const { Step } = Steps;

function CreatesystemPage(props) {
  const { step } = useContext(CreatesystemContext);

  const StepCreatesystem = () => {
    switch (step) {
      case 1:
        return <Step1 {...props} />;
      case 2:
          return <Step2 {...props} />;
      // case 3:
      //     return <Step3 {...props} />;
      case 3:
          return <Step4 {...props} />;
    }
  };
  console.log(step);

  return (
    <Layout {...props}>
      <div className="container">
        <Box className="col-12 col-lg-9 px-3 px-sm-5 py-3 py-sm-5 my-3 my-sm-5 mx-sm-auto">
          <div className="px-sm-5">
            <div className="text-center">
              <span className="font-title">Create System</span>
            </div>
            <div id="StepCreateSystem" className="mt-4 ">
              <Steps size="small" current={step - 1}>
                <Step title="System detail" />
                <Step title="Line Official Account" />
                {/* <Step title="Facebook Page" /> */}
                <Step title="Confirm" />
              </Steps>
            </div>
            <div className="col-12 mt-3 mt-sm-5">{StepCreatesystem()}</div>
          </div>
        </Box>
      </div>
    </Layout>
  );
}

export default CreatesystemPage;
