import React from "react";
import styled from "styled-components";

const StyleButton = styled.button`
  .anticon {
    vertical-align: 0em;
  }
  border: none;
  border-radius: 50px;
  padding: 5px 20px 5px 20px;
  background-color: ${(props) =>
    props.danger ? props.theme.color.danger : props.theme.color.base};
  color: white;
  &:hover {
    background-color: ${(props) =>
      props.danger
        ? props.theme.color.danger_hover
        : props.theme.color.base_hover};
  }
`;

export default function Button(props) {
  return <StyleButton {...props}>{props.children}</StyleButton>;
}
