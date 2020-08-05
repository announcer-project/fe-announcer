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
    <Bar className="navbar navbar-light px-5 shadow-sm">
      <div className="container">
        <Link href="/">
          <div>
            <img
              src="/img/logo.png"
              alt="News Management System"
              width="35px"
              height="35px"
            />
            <span className="ml-2">News Management System</span>
          </div>
        </Link>
        <Button className="px-3 py-1">console</Button>
      </div>
    </Bar>
  );
}

export default Navbar;
