import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const LineLiff = dynamic(
  () => {
    return import("../../components/Line/Register/RegisterPage");
  },
  { ssr: false }
);

export default function LiffPage() {
  return <>Loading ...</>
}

// export function getServerSideProps(ctx) {
//   console.log(ctx.query)
//   return { props: {} };
// }
