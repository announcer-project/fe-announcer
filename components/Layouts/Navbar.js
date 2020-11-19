import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import cookie from "../../tools/cookie";
import Router from "next/router";
import Button from "../common/Button";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

import { Menu, Dropdown } from "antd";

const Logo = styled.div`
  cursor: pointer;
`;

const Bar = styled.nav`
  width: 100%;
  height: 50px;
  background-color: white;
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

function Navbar() {
  const [user, setUser] = useState({});
  const router = useRouter();
  let pagename = router.pathname.split("/")[1];

  useEffect(() => {
    if (cookie.getJWT()) {
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
      <Menu>
        <div className="d-lg-none py-1">
          <span style={{ paddingLeft: "12px", paddingRight: "12px" }}>
            Hi' {user.fname}
          </span>
        </div>
        <Menu.Item key="0">
          <MenuStyle>
            <span>
              <UserOutlined className="mr-2" />
              Profile
            </span>
          </MenuStyle>
        </Menu.Item>
        <Menu.Item onClick={Logout} key="0">
          <MenuStyle>
            <span>
              <LogoutOutlined className="mr-2" /> Logout
            </span>
          </MenuStyle>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <Bar className="navbar navbar-light shadow-sm py-1">
      <div className="container">
        <Link href="/">
          <Logo>
            <img
              src="/img/announcer-logo.png"
              alt="Announcer"
              width="35px"
              height="35px"
            />
            <span className="ml-2">
              <b>Announcer</b>
            </span>
          </Logo>
        </Link>
        <div className="d-flex justify-content-between">
          {pagename == "" || pagename == "register" ? (
            <Button
              onClick={onLink}
              className="mr-2 mt-1"
              style={{ height: "100%" }}
            >
              console
            </Button>
          ) : (
            ""
          )}
          {cookie.getJWT() ? (
            <Dropdown
              overlay={menu()}
              trigger={["click"]}
              arrow
              placement="bottomRight"
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
          ) : (
            ""
          )}
        </div>
      </div>
    </Bar>
  );
}

export default Navbar;
