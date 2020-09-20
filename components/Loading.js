// export default function Loading(props) {
//   return (
//   );
// }
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Spin } from "antd";
import LoadingComponent from "./common/Loading";

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
    return <LoadingComponent />;
  } else {
    return <div />;
  }
}
