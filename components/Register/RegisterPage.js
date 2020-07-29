import Layouts from "../Layouts/Layouts"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import { Steps } from 'antd';
import React, { useContext } from "react";
import { RegisterContext } from "../../store/RegisterProvider";
import styled from "styled-components";
import "./Register.module.css";


const Box = styled.div`
    border: 2px solid white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
`

const { Step } = Steps;

export default function RegisterPage(props) {
    const { step } = useContext(RegisterContext);
    const StepRegister = () => {
        switch (step) {
            case 1:
                return <Step1 {...props} />;
            case 2:
                return <Step2 {...props} />;
            case 3:
                return <Step3 {...props} />;
        }
    };

    return (
        <Layouts {...props}>
            <div className="container">
                <div className="col-12">
                    <Box className="col-8 px-5 mt-5 mx-auto p-4">
                        <h1 className="text-center">Register</h1>
                        <div className="col-10 mx-auto mt-5">
                            <Steps current={step - 1}>
                                <Step title="Verify your e-mail" />
                                <Step title="In Progress" />
                                <Step title="Waiting" />
                            </Steps>,
                        </div>
                        <div className="col-6 mx-auto">
                            {StepRegister()}
                        </div>
                    </Box>
                </div>
            </div>
                    <div className="fomt-colorred">hi</div>
        </Layouts>
    )
}
