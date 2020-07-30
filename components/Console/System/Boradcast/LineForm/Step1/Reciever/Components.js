import React from "react";
import styled from "styled-components";

const StyleBox = styled.div`
  border-radius: 50px;
  background-color: ${(props) => (props.selected ? "#050042" : "")};
  color: ${(props) => (props.selected ? "white" : "#050042")};
  cursor: ${(props) => (props.checked ? "pointer" : "not-allowed")};
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
