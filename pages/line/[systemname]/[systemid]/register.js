import React, { useEffect } from "react";
// import dynamic from "next/dynamic"

// const liff = dynamic(
//   () => {
//     return import("../../../../components/Line/LineLiff");
//   },
//   { ssr: false }
// );

export default function LineLiffRegister() {
  return <div>Line Register</div>;
}

export function getServerSideProps() {
  return { props: {} };
}
