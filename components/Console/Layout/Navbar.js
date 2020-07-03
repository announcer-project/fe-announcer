import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
import cookie from "../../../tools/cookie";
import jwtDecode from "jwt-decode";

import { Menu, Dropdown } from "antd";

const Bar = styled.nav`
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: white;
`;

export default function Navbar() {
  let user = {};
  try {
    user = jwtDecode(cookie.getJWT());
  } catch (error) {}

  const Logout = () => {
    cookie.clearJWT();
    Router.push("/");
  };

  const menu = () => {
    return (
      <Menu className="mt-1" style={{ width: "100px" }}>
        <Menu.Item onClick={Logout} key="0">
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <>
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
          Hi' {user.fname}
          <Dropdown overlay={menu()} trigger={["click"]}>
            <img
              src="/img/user-profile.png"
              alt={user.fname + "" + user.lname}
              className="ml-3"
              width="34px"
              height="34px"
            />
          </Dropdown>
        </div>
      </Bar>
    </>
  );
}
