import React from "react"
import Link from "next/link";
import Layout from "../Layouts/Layouts"

export default function Home(props) {
  const SetCookie = () => {
    document.cookie = `test=sfafdsfsdf; path=/`;
  };
  return (
    <Layout {...props}>
      <div>Hello, next.js</div>
      <Link href="/login">
        <button type="button" className="btn btn-success">
          Console
        </button>
      </Link>
      <Link href="/console/systems">
        <button type="button" className="btn btn-success">
          Systems
        </button>
      </Link>
      <button onClick={SetCookie}>Set</button>
    </Layout>
  );
}
