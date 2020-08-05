import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border-radius: 30px;
  border: none;
  background-color: ${(props) => props.bg};
  color: white;
`;

export function ButtonBack(props) {
  return <Button {...props} bg={"#CE0000"} className="px-4 px-sm-5 py-2 font-small" >Back</Button>;
}
export function ButtonNext(props) {
  return <Button {...props} bg={"#050042"} className="px-4 px-sm-5 py-2 font-small" >Next</Button>;
}
