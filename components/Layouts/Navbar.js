import styled from "styled-components";
import Link from "next/link";

const Bar = styled.nav`
  width: 100%;
  height: 50px;
  background-color: white;
`;

const Button = styled.button`
  border: none;
  background-color: #050042;
  color: white;
  border-radius: 20px;
`;
function Navbar() {
  return (
    <Bar className="navbar navbar-light shadow-sm">
      <div className="container">
        <Link href="/">
          <div>
            <img
              src="/img/logo.png"
              alt="Announcer"
              width="35px"
              height="35px"
            />
            <span className="ml-2">Announcer</span>
          </div>
        </Link>
        <Link href="/console/systems">
          <Button className="px-3 py-1">console</Button>
        </Link>
      </div>
    </Bar>
  );
}

export default Navbar;
