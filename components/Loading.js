import styled from "styled-components";
import { Spin } from "antd";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(255, 255, 255, 0.95);
  z-index: 100;
  position: fixed;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export default function Loading(props) {
  return (
    <Box className={`${props.display ? "" : "d-none"}`}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "90%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
        }}
        className="text-center"
      >
        <Spin size="large" />
        <h3 className="pt-3">Loading...</h3>
      </div>
    </Box>
  );
}