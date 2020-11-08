import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Router from "next/router";
import cookie from "../../../../tools/cookie";
import Button from "../../../common/Button";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import {LogoutOutlined} from "@ant-design/icons"

import { Menu, Dropdown } from "antd";

const Bar = styled.nav`
  height: 50px;
  background-color: white;
  .anticon {
    vertical-align: 0em;
  }
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
      <Menu className="mt-2" style={{ width: "100px" }}>
        <Menu.Item onClick={Logout} key="0">
          <span><LogoutOutlined/>Logout</span>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <>
      <Bar className="navbar navbar-light shadow-sm">
        <div className="container">
          <div />
          <div>
            <Link href="https://documenter.getpostman.com/view/13231346/TVYF8dpf" prefetch={false}>
              <a target={"_blank"}>
                <Button className="mr-lg-2">APIs</Button>
              </a>
            </Link>
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
