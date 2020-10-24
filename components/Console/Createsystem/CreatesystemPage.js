import Step from "../../common/Step";
import React, { useContext } from "react";
import { CreatesystemContext } from "../../../store/CreatesystemProvider";
import styled from "styled-components";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step4 from "./Step4";

const Box = styled.div`
  border: 2px solid white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
`;

function CreatesystemPage(props) {
  const { step } = useContext(CreatesystemContext);

  const StepCreatesystem = () => {
    switch (step) {
      case 1:
        return <Step1 {...props} />;
      case 2:
        return <Step2 {...props} />;
      case 3:
        return <Step4 {...props} />;
    }
  };

  return (
    <div className="container">
      <Box className="col-12 col-lg-9 px-3 px-lg-5 py-3 py-lg-5 my-3 my-sm-5 mx-sm-auto">
        <div className="">
          <div className="text-center">
            <h1>Create System</h1>
          </div>
          <div className="mt-4 ">
            <Step
              StepShow={[
                { title: "System detail" },
                { title: "Line Official Account" },
                { title: "Confirm" },
              ]}
              now={step}
              size={"small"}
            />
          </div>
          <div className="col-12 mt-3 mt-sm-5">{StepCreatesystem()}</div>
        </div>
      </Box>
    </div>
  );
}

export default CreatesystemPage;
