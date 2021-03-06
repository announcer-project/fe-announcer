import Head from "next/head";
import dynamic from "next/dynamic";
import { createGlobalStyle } from "styled-components";
import Theme from "../components/Theme";

import "antd/dist/antd.css";

const GlobalStyle = createGlobalStyle`
  .global {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    color: black;
  }
  h1 {
    font-size: 20px;
    padding: 0;
  }
  h2 {
    font-size: 16px;
    padding: 0;
  }
  h6 {
    font-size: 12px;
    padding: 0;
  }
  .color-drop {
    color: #A6A6A6;
  }
  .border-radius-small {
    border-radius: 10px;
  }
  .input-text-height {
    height: 30px;
  }
  .anticon {
    vertical-align: 0em;
  }
`;

const Loading = dynamic(
  () => {
    return import("../components/Loading");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/announcer-logo.ico" />
      </Head>
      <GlobalStyle />
      {/* <Loading /> */}
      <Theme>
        <div className="global">
          <Component {...pageProps} />
        </div>
      </Theme>
    </>
  );
}

export default MyApp;
