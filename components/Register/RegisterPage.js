import Layouts from "../Layouts/Layouts";
import Step1 from "./Step1";
import StepConnectSocial from "./Step1-2";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { Steps } from "antd";
import React, { useContext } from "react";
import { RegisterContext } from "../../store/RegisterProvider";
import styled from "styled-components";
import "./Register.module.css";

const Box = styled.div`
  border: 2px solid white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
`;

const { Step } = Steps;

export default function RegisterPage() {
  const { step } = useContext(RegisterContext);
  const StepRegister = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 1.2:
        return <StepConnectSocial />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
    }
  };

  return (
    <div className="container">
      <Box className="col-12 col-lg-9 my-5 mx-auto py-3 py-lg-5 px-3">
        <p className="text-center font-title m-0">Register</p>
        <div id="StepRegister" className="col-12 col-lg-10 mx-auto mt-4">
          <Steps size="small" current={step - 1}>
            <Step title="Verify your e-mail" />
            <Step title="In Progress" />
            <Step title="Confirm" />
          </Steps>
        </div>
        <div className="col-12 col-lg-6 mx-auto mt-3 pt-lg-4">
          {StepRegister()}
        </div>
      </Box>
    </div>
  );
}
