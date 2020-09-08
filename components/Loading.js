// export default function Loading(props) {
//   return (
//   );
// }
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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

export default function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => setLoading(true);
    // handleComplete event was not firing
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  if (loading) {
    return (
      <Box>
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
  } else {
    return <div />;
  }
}
