import React from "react";
import styled from "styled-components";

const StyleBox = styled.div`
  cursor: ${(props) => (props.checked ? "pointer" : "not-allowed")};
  border-radius: 20px;
  background-color: ${(props) =>
    props.selected ? props.theme.color.base : "white"};
  color: ${(props) => (props.selected ? "white" : "rgb(0,0,0,0.65)")};
`;
export function NewsTypeBox(props) {
  return (
    <div {...props}>
      <StyleBox
        selected={props.selected}
        checked={props.checked}
        className="shadow-sm border px-3 py-1"
      >
        <span>{props.children}</span>
      </StyleBox>
    </div>
  );
}
export function TargetGroupBox(props) {
  return (
    <div {...props}>
      <StyleBox
        selected={props.selected}
        checked={props.checked}
        className="shadow-sm border px-3 py-1"
      >
        <span>{props.children}</span>
      </StyleBox>
    </div>
  );
}

const ButtonAdd = styled.div`
  cursor: ${(props) => (props.checked ? "pointer" : "not-allowed")};
  background-color: #050042;
  border-radius: 50px;
  color: white;
`;
const ButtonRemove = styled.div`
  cursor: ${(props) => (props.checked ? "pointer" : "not-allowed")};
  background-color: #ce0000;
  border-radius: 50px;
  color: white;
`;
export function ButtonAddUser(props) {
  return (
    <div {...props}>
      <ButtonAdd checked={props.checked} className="px-3 py-1 mt-2 font-small">
        Add
      </ButtonAdd>
    </div>
  );
}
export function ButtonRemoveUser(props) {
  return (
    <div {...props}>
      <ButtonRemove
        checked={props.checked}
        className="px-3 py-1 mt-2 font-small"
      >
        Remove
      </ButtonRemove>
    </div>
  );
}
