import Head from "next/head";
import dynamic from "next/dynamic";
import { CounterProvider } from "../store/CouterProvider";
import { createGlobalStyle } from "styled-components";

import "nprogress/nprogress.css";
import "antd/dist/antd.css";
import "../CKEditor.css"

const GlobalStyle = createGlobalStyle`
body {
}
`;

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <TopProgressBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
