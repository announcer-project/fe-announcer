import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Router from "next/router";
import cookie from "../../../../tools/cookie";
import Button from "../../../common/Button";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

import { Menu, Dropdown } from "antd";

const Bar = styled.nav`
  height: 50px;
  background-color: white;
  .anticon {
    vertical-align: 0em;
  }
`;

const MenuStyle = styled.div`
  .anticon {
    vertical-align: 2px;
  }
`;

const Profile = styled.div`
  cursor: pointer;
  border-radius: 25px;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const ProfileImage = styled.img`
  width: 34px;
  height: 35px;
  object-fit: cover;
  border-radius: 17px;
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
      <Menu>
        <div className="d-lg-none py-1">
          <span style={{ paddingLeft: "12px", paddingRight: "12px" }}>
            Hi' {user.fname}
          </span>
        </div>
        <Menu.Item key="0">
          <Link href={`/profile`} as={`/profile`}>
            <MenuStyle>
              <span>
                <UserOutlined className="mr-2" />
                Profile
              </span>
            </MenuStyle>
          </Link>
        </Menu.Item>
        <Menu.Item onClick={Logout} key="1">
          <MenuStyle>
            <span>
              <LogoutOutlined className="mr-2" />
              Logout
            </span>
          </MenuStyle>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <>
      <Bar className="navbar navbar-light shadow-sm  py-1">
        <div className="container">
          <div />
          <div className="d-flex justify-content-between">
            <Link
              href="https://documenter.getpostman.com/view/13231346/TVYF8dpf"
              prefetch={false}
            >
              <a target={"_blank"}>
                <Button className="mr-2 mt-1">Open APIs</Button>
              </a>
            </Link>
            <Dropdown
              overlay={menu()}
              placement="bottomRight"
              trigger={["click"]}
              arrow
            >
              <Profile className="px-3 py-1">
                <span className="d-none d-sm-inline-block">
                  Hi' {user.fname}
                </span>
                <ProfileImage
                  src={`${process.env.REACT_APP_STORAGE}/profile/${user.user_id}.jpg`}
                  alt={user.fname + "" + user.lname}
                  className="ml-0 ml-sm-2"
                />
              </Profile>
            </Dropdown>
          </div>
        </div>
      </Bar>
    </>
  );
}
