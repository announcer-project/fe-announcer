import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

import Navbar from "./Navbar";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  AreaChartOutlined,
  SendOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  GlobalOutlined,
  FileOutlined,
  FileAddOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = styled(Sider)`
  .anticon {
    vertical-align: 0em;
  }
`;

export default function LayoutPage(props) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  let pagename = router.pathname.split("/")[4];
  let pagetype = router.pathname.split("/")[5];
  if (pagetype !== undefined) {
    let name = pagename;
    pagename = pagetype;
    pagetype = name;
  }
  const { systemid, systemname } = router.query;
  const path = `/console/${systemname}/${systemid}`;

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Link href="/console/systems">
          <a>
            <div className="logo pt-3 pb-2" style={{ cursor: "pointer" }}>
              <img
                src="/img/announcer-logo.png"
                alt="Announcer"
                width="35px"
                height="35px"
                style={{ marginLeft: "24px" }}
              />
              <span className={`text-light pl-2 ${collapsed ? "d-none" : ""}`}>
                <b>Announcer</b>
              </span>
            </div>
          </a>
        </Link>
        <Menu
          theme="dark"
          defaultSelectedKeys={[pagename]}
          defaultOpenKeys={[pagetype]}
          mode="inline"
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link href={path + "/home"}>
              <a>Home</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="broadcast" icon={<SendOutlined />}>
            <Link href={path + "/broadcast"}>
              <a>Broadcast</a>
            </Link>
          </Menu.Item>
          <SubMenu key="news" icon={<FileOutlined />} title="News">
            <Menu.Item key="allnews">
              <Link href={path + "/news/allnews"}>
                <a>
                  <GlobalOutlined /> All news
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="createnews">
              <Link href={path + "/news/createnews"}>
                <a>
                  <FileAddOutlined /> Create news
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="createnewstype">
              <Link href={path + "/news/createnewstype"}>
                <a>
                  <PlusOutlined /> Create news type
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="targetgroup"
            icon={<TeamOutlined />}
            title="Target group"
          >
            <Menu.Item key="alltargetgroup">
              <Link href={path + "/targetgroup/alltargetgroup"}>
                <a>
                  <TeamOutlined /> All target group
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="createtargetgroup">
              <Link href={path + "/targetgroup/createtargetgroup"}>
                <a>
                  <UsergroupAddOutlined /> Create target group
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="role" icon={<TeamOutlined />} title="Role">
            <Menu.Item key="allrole">
              <Link href={path + "/role/allrole"}>
                <a>
                  <TeamOutlined /> All role
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="createrole">
              <Link href={path + "/role/createrole"}>
                <a>
                  <UsergroupAddOutlined /> Create role
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="rolerequest">
              <Link href={path + "/role/rolerequest"}>
                <a>
                  <UsergroupAddOutlined /> Role request
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="connect" icon={<TeamOutlined />} title="Role">
            <Menu.Item key="all">
              <Link href={path + "/connect/all"}>
                <a>
                  <TeamOutlined /> All
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="line">
              <Link href={path + "/connect/line"}>
                <a>
                  <UsergroupAddOutlined /> Line
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="facebook">
              <Link href={path + "/connect/facebook"}>
                <a>
                  <UsergroupAddOutlined /> Facebook
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="dashboard" icon={<AreaChartOutlined />}>
            Dashboard
          </Menu.Item>
        </Menu>
      </Sidebar>
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ background: "white" }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
