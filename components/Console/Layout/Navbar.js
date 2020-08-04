import React, { useState, useEffect } from "react";
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

const Profile = styled.img`
  width: 34px;
  height: 35px;
  object-fit: cover;
  border-radius: 17px;
  cursor: pointer;
`;

export default function Navbar() {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    try {
      let userData = jwtDecode(cookie.getJWT());
      setUser(userData);
    } catch (error) {}
  }, []);

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
  console.log(user);
  return (
    <>
      <Bar className="navbar navbar-light">
        <div className="container">
          <Link href="/">
            <div style={{ cursor: "pointer" }}>
              <img
                src="/img/logo.png"
                alt="News Management System"
                width="35px"
                height="35px"
              />
              <span className="ml-2">Announcer</span>
            </div>
          </Link>
          <div>
            <span className="d-none d-sm-inline-block">Hi' {user.fname}</span>
            <Dropdown overlay={menu()} trigger={["click"]}>
              <Profile
                src={`${process.env.REACT_APP_STORAGE}/profile/${user.user_id}.jpg`}
                alt={user.fname + "" + user.lname}
                className="ml-3"
              />
            </Dropdown>
          </div>
        </div>
      </Bar>
    </>
  );
}
