import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import cookie from "../../tools/cookie";
import Router from "next/router";
import Button from "../common/Button";
import jwtDecode from "jwt-decode";

import { Menu, Dropdown } from "antd";

const Logo = styled.div`
  cursor: pointer;
`;

const Bar = styled.nav`
  width: 100%;
  height: 50px;
  background-color: white;
`;

const DropMenu = styled(Menu)`
  min-width: 100px;
`;

const Profile = styled.img`
  width: 34px;
  height: 35px;
  object-fit: cover;
  border-radius: 17px;
  cursor: pointer;
`;
("");

function Navbar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (cookie.getJWT()) {
      console.log("have")
      try {
        let userData = jwtDecode(cookie.getJWT());
        setUser(userData);
      } catch (error) {}
    }
  }, []);

  const Logout = () => {
    cookie.clearJWT();
    Router.push("/");
  };

  const onLink = () => {
    if (cookie.getJWT() === undefined) {
      Router.push("/login");
    } else {
      Router.push("/console/systems");
    }
  };

  const menu = () => {
    return (
      <DropMenu className="mt-1">
        <div className="d-lg-none">
          <span style={{ paddingLeft: "12px", paddingRight: "12px" }}>
            Hi' {user.fname}
          </span>
        </div>
        <Menu.Item onClick={Logout} key="0">
          <span>Logout</span>
        </Menu.Item>
      </DropMenu>
    );
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
            <span className="ml-2"><b>Announcer</b></span>
          </Logo>
        </Link>
        {cookie.getJWT() ? (
          <div>
            <span className="d-none d-lg-inline-block">Hi' {user.fname}</span>
            <Dropdown overlay={menu()} trigger={["click"]}>
              <Profile
                src={`${process.env.REACT_APP_STORAGE}/profile/${user.user_id}.jpg`}
                alt={user.fname + "" + user.lname}
                className="ml-3"
              />
            </Dropdown>
          </div>
        ) : (
          <Button onClick={onLink}>console</Button>
        )}
      </div>
    </Bar>
  );
}

export default Navbar;
