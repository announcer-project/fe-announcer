import React from "react";
import styled from "styled-components";

const StyleButton = styled.button`
  .anticon {
    vertical-align: 0em;
  }
  border: 1px solid
    ${(props) =>
      props.danger ? props.theme.color.danger : props.theme.color.base};
  border-radius: 50px;
  padding: 6px 22px 6px 22px;
  background-color: ${(props) =>
    props.danger ? props.theme.color.danger : props.theme.color.base};
  color: white;
  transition: 0.5s;
  &:hover {
    color: ${(props) =>
      props.danger ? props.theme.color.danger : props.theme.color.base};
    background-color: white;
  }
`;

export default function Button(props) {
  return <StyleButton {...props}>{props.children}</StyleButton>;
}
