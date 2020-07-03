import React, { useState } from "react";
import Link from "next/link";

import Navbar from "./Navbar";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function LayoutPage(props) {
  const [collapsed, setCollapsed] = useState(false);
  const page = props.page;
  const path = `/console/${props.query.systemname}/${props.query.systemid}`;

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Link href="/console/systems">
          <div className="logo">{props.query.systemname}</div>
        </Link>
        <Menu
          theme="dark"
          defaultSelectedKeys={[page.name]}
          defaultOpenKeys={[page.type]}
          mode="inline"
        >
          <Menu.Item key="home" icon={<PieChartOutlined />}>
            <Link href={path + "/home"}>
              <a>Home</a>
            </Link>
          </Menu.Item>
          <SubMenu key="news" icon={<UserOutlined />} title="News">
            <Menu.Item key="allnews">
              <Link href={path + "/news/allnews"}>
                <a>All news</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="createnews">
              <Link href={path + "/news/createnews"}>
                <a>Create news</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="createnewstype">
              <Link href={path + "/news/createnewstype"}>
                <a>Create news type</a>
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
                <a>All target group</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="createtargetgroup">
              <Link href={path + "/targetgroup/createtargetgroup"}>
                <a>Create target group</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Navbar {...props} />
        <Content style={{ background: "white" }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
