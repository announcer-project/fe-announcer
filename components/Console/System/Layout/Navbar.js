import styled from "styled-components";
import Router from "next/router";
import cookie from "../../../../tools/cookie";
import jwtDecode from "jwt-decode";

import { Menu, Dropdown } from "antd";

const Bar = styled.nav`
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
      <Menu className="mt-2" style={{ width: "100px" }}>
        <Menu.Item onClick={Logout} key="0">
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <>
      <Bar className="navbar navbar-light px-5 shadow-sm">
        <div />
        <div>
          <span>Hi' {user.fname}</span>
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
