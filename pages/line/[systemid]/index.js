import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const LineLiff = dynamic(
  () => {
    return import("../../../components/Line/FetchDataLine");
  },
  { ssr: false }
);

export default function LiffPage() {
  return <LineLiff />
}
