import styled from "styled-components";
import Button from "../common/Button"

export default function ButtonLogin(props) {
  return (
    <Button {...props}>
      <img
        className="mr-2"
        src={`/img/Login/${props.children}.png`}
        alt={props.children}
        width="20px"
      />
      Sign in with {props.children}
    </Button>
  );
};
