import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

import Navbar from "./Navbar";
import { Layout as LayoutAnt, Menu } from "antd";
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
  ApiOutlined,
  FacebookOutlined,
  AimOutlined,
  UserAddOutlined,
  UserOutlined,
  AuditOutlined,
  IdcardOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const { Content, Sider } = LayoutAnt;
const { SubMenu } = Menu;

const Layout = styled(LayoutAnt)`
  .ant-layout-sider {
    background: ${(props) => props.theme.color.background};
  }
  .ant-menu.ant-menu-dark,
  .ant-menu-dark .ant-menu-sub,
  .ant-menu.ant-menu-dark .ant-menu-sub {
    background: ${(props) => props.theme.color.background};
  }
  .ant-layout-sider-trigger {
    background: #011020;
  }
  .ant-menu-dark .ant-menu-inline.ant-menu-sub {
    background: #011020;
  }
`;

const Sidebar = styled(Sider)`
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background-color: ${(props) => props.theme.color.base};
  }
  .anticon {
    vertical-align: 0em;
  }
`;

const Announcer = styled.span`
  opacity: ${(props) => (props.collapsed ? 0 : 1)};
  display: ${(props) => (props.collapsed ? "none" : "block")};
`;

export default function LayoutPage(props) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  let pagename = router.pathname.split("/")[4];
  let pagetype = router.pathname.split("/")[5];

  if (pagetype !== undefined && pagename !== "connect" && pagename !== "setting") {
    let name = pagename;
    pagename = pagetype;
    pagetype = name;
  }
  const { systemid, systemname } = router.query;

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width={250}
      >
        <Link href="/console/systems">
          <a>
            <div
              className="pt-3 pb-2 text-center"
              style={{ cursor: "pointer" }}
            >
              <img
                src="/img/announcer-logo.png"
                alt="Announcer"
                width="35px"
                height="35px"
              />
              <Announcer className={`text-light pl-2`} collapsed={collapsed}>
                <b>Announcer</b>
              </Announcer>
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
            <Link
              href={`/console/[systemname]/[systemid]/home?systemname=${systemname}&systemid=${systemid}`}
              as={`/console/${systemname}/${systemid}/home`}
            >
              <a>{systemname}</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="line" icon={<SendOutlined />}>
            <Link
              href={`/console/[systemname]/[systemid]/broadcast/line?systemname=${systemname}&systemid=${systemid}`}
              as={`/console/${systemname}/${systemid}/broadcast/line`}
            >
              <a>Broadcast</a>
            </Link>
          </Menu.Item>
          <SubMenu key="news" icon={<FileOutlined />} title="News">
            <Menu.Item key="allnews">
              <Link
                href={`/console/[systemname]/[systemid]/news/allnews?systemname=${systemname}&systemid=${systemid}`}
                as={`/console/${systemname}/${systemid}/news/allnews`}
              >
                <a>
                  <GlobalOutlined /> All news
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="createnews">
              <Link
                href={`/console/[systemname]/[systemid]/news/createnews?systemname=${systemname}&systemid=${systemid}`}
                as={`/console/${systemname}/${systemid}/news/createnews`}
              >
                <a>
                  <FileAddOutlined /> Create news
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="createnewstype">
              <Link
                href={`/console/[systemname]/[systemid]/news/createnewstype?systemname=${systemname}&systemid=${systemid}`}
                as={`/console/${systemname}/${systemid}/news/createnewstype`}
              >
                <a>
                  <PlusOutlined /> Create news type
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="targetgroup"
            icon={<AimOutlined />}
            title="Target group"
          >
            <Menu.Item key="alltargetgroup">
              <Link
                href={`/console/[systemname]/[systemid]/targetgroup/alltargetgroup?systemname=${systemname}&systemid=${systemid}`}
                as={`/console/${systemname}/${systemid}/targetgroup/alltargetgroup`}
              >
                <a>
                  <TeamOutlined /> All target group
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="createtargetgroup">
              <Link
                href={`/console/[systemname]/[systemid]/targetgroup/createtargetgroup?systemname=${systemname}&systemid=${systemid}`}
                as={`/console/${systemname}/${systemid}/targetgroup/createtargetgroup`}
              >
                <a>
                  <UsergroupAddOutlined /> Create target group
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="role" icon={<IdcardOutlined />} title="Role">
            <Menu.Item key="allrole">
              <Link
                href={`/console/[systemname]/[systemid]/role/allrole?systemname=${systemname}&systemid=${systemid}`}
                as={`/console/${systemname}/${systemid}/role/allrole`}
              >
                <a>
                  <UserOutlined /> All role
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="createrole">
              <Link
                href={`/console/[systemname]/[systemid]/role/createrole?systemname=${systemname}&systemid=${systemid}`}
                as={`/console/${systemname}/${systemid}/role/createrole`}
              >
                <a>
                  <UserAddOutlined /> Create role
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="rolerequest">
              <Link
                href={`/console/[systemname]/[systemid]/role/rolerequest?systemname=${systemname}&systemid=${systemid}`}
                as={`/console/${systemname}/${systemid}/role/rolerequest`}
              >
                <a>
                  <AuditOutlined /> Role request
                </a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="connect" icon={<ShareAltOutlined />}>
            <Link
              href={`/console/[systemname]/[systemid]/connect?systemname=${systemname}&systemid=${systemid}`}
              as={`/console/${systemname}/${systemid}/connect`}
            >
              <a>Connect Social</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="setting" icon={<ShareAltOutlined />}>
            <Link
              href={`/console/[systemname]/[systemid]/setting?systemname=${systemname}&systemid=${systemid}`}
              as={`/console/${systemname}/${systemid}/setting`}
            >
              <a>Setting</a>
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="dashboard" icon={<AreaChartOutlined />}>
            Dashboard
          </Menu.Item> */}
        </Menu>
      </Sidebar>
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ background: "white" }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
