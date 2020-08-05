import React from "react";
import styled from "styled-components";

const StyleBox = styled.div`
  border-radius: 50px;
  background-color: white;
  color: #050042;
`;

export function NewsTypeBox(props) {
  return (
    <div {...props}>
      <StyleBox className="shadow-sm border px-3 py-1">
        <span>{props.children}</span>
      </StyleBox>
    </div>
  );
}
export function TargetGroupBox(props) {
  return (
    <div {...props}>
      <StyleBox className="shadow-sm border px-3 py-1">
        <span>{props.children}</span>
      </StyleBox>
    </div>
  );
}

const CancelButton = styled.button`
  background-color: white;
  border: none;
`;

export function Cancel(props) {
  return <CancelButton {...props}>{props.children}</CancelButton>;
}

const Button = styled.button`
  border-radius: 20px;
  border: none;
  background-color: #050042;
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;

export function NextButton(props) {
  return <Button {...props}>{props.children}</Button>;
}
