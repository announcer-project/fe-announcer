import React from "react";
import styled from "styled-components";

const StyleBox = styled.div`
  border-radius: 50px;
  background-color: ${(props) => (props.background ? props.theme.color.base : "white")};
  color: ${(props) => (props.color ? "white" : props.theme.color.base)};
`;

export function NewsTypeBox(props) {
  return (
    <div {...props}>
      <StyleBox background={props.background} color={props.color} className="shadow-sm border px-3 py-1">
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
  background-color: ${(props) => (props.back ? "#CE0000" : "#050042")};
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;

export function NextButton(props) {
  return <Button {...props}>{props.children}</Button>;
}
export function BackButton(props) {
  return (
    <Button back={true} {...props}>
      {props.children}
    </Button>
  );
}
