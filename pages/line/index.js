import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const LineLiff = dynamic(
  () => {
    return import("../../components/Line/LineLiff");
  },
  { ssr: false }
);

export default function LiffPage() {
  return <LineLiff/>;
}

export function getServerSideProps(ctx) {
  console.log(ctx.query)
  return { props: {} };
}
