import { Layout } from "antd";

import Navbar from "./Navbar";

const { Content } = Layout;

export default function LayoutPage(props) {
  return (
    <>
      <div>
        <Navbar />
        <div>{props.children}</div>
      </div>
    </>
  );
}
