import { Steps } from 'antd';
import React, { useContext } from 'react';
import { CreatesystemContext } from '../../../store/CreatesystemProvider';
import styled from "styled-components";
import Step1 from "./Step1"


const Box = styled.div`
    border: 2px solid white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
`
const { Step } = Steps;

function CreatesystemPage(props) {
    const { step } = useContext(CreatesystemContext);
    const StepCreatesystem = () => {
        switch (step) {
            case 1:
                return <Step1 {...props} />;
            // case 2:
            //     return <Step2 {...props} />;
            // case 3:
            //     return <Step3 {...props} />;
            // case 4:
            //     return <Step4 {...props} />;
        }
    };
    console.log(step)

    return (
        <div className="container">
            <div className="col-12">
                <Box className="col-8 px-5 mt-5 mx-auto p-4">
                    <h1 className="text-center">Create System</h1>
                    <div className="col-11 mx-auto mt-5">
                        <Steps current={step - 1}>
                            <Step title="Verify your e-mail" />
                            <Step title="In Progress" />
                            <Step title="Waiting" />
                            <Step title="Waiting" />
                        </Steps>,
                        </div>
                    <div className="col-6 mx-auto">
                        {StepCreatesystem()}
                    </div>
                </Box>
            </div>

        </div>
    )
}

export default CreatesystemPage;