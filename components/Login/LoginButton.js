import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  padding: 8px;
  border-radius: 30px;
  border: none;
  background-color: #050042;
  color: white;
`;

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
