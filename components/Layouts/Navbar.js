import styled from "styled-components";
import Link from "next/link";

const Bar = styled.nav`
  width: 100%;
  height: 50px;
  background-color: white;
`;

function Navbar() {
    return (
        <Bar className="navbar navbar-light px-5">
            <Link href="/">
                <div>
                    <img
                        src="/img/logo.png"
                        alt="News Management System"
                        width="35px"
                        height="35px"
                    />
                    <span className="ml-2" style={{ fontSize: "20px" }}>
                        News Management System
            </span>
                </div>
            </Link>
            <div>
               console
            </div>
        </Bar>
    )
}

export default Navbar