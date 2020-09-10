import styled from "styled-components";
import Link from "next/link";
import cookie from "../../tools/cookie";
import Router from "next/router";
import Button from "../common/Button";

const Logo = styled.div`
  cursor: pointer;
`;

const Bar = styled.nav`
  width: 100%;
  height: 50px;
  background-color: white;
`;

// const Button = styled.button`
//   border: none;
//   background-color: #050042;
//   color: white;
//   border-radius: 20px;
// `;

function Navbar() {
  const onLink = () => {
    if (cookie.getJWT() === undefined) {
      Router.push("/login");
    } else {
      Router.push("/console/systems");
    }
  };
  return (
    <Bar className="navbar navbar-light shadow-sm">
      <div className="container">
        <Link href="/">
          <Logo>
            <img
              src="/img/announcer-logo.png"
              alt="Announcer"
              width="35px"
              height="35px"
            />
            <span className="ml-2">Announcer</span>
          </Logo>
        </Link>
        <Button onClick={onLink}>
          console
        </Button>
      </div>
    </Bar>
  );
}

export default Navbar;
