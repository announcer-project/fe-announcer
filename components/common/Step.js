import { Steps } from "antd";
import styled from "styled-components"

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

export default function StyleStep({ StepShow, now, size }) {
  return (
    <StepBar size={size} current={now - 1}>
      {StepShow.map((step) => {
        return <Step title={step.title} />;
      })}
    </StepBar>
  );
}
