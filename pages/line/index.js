import React from "react"
import dynamic from "next/dynamic"

const liff = dynamic(
  () => {
    return import("../../components/Line/LineLiffInitial");
  },
  { ssr: false }
);

export default function LiffPage() {
    return (
        <div>
            Welcome starter liff
        </div>
    )
}

export function getServerSideProps() {
    return {props:{}}
}