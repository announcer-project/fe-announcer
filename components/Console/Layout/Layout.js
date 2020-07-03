import { Layout } from "antd";

import Navbar from "./Navbar";

const { Content } = Layout;

export default function LayoutPage(props) {
  return (
    <>
      <Layout className="layout">
        <Navbar />
        <Content>{props.children}</Content>
      </Layout>
    </>
  );
}
