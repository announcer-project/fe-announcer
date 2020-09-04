import Head from "next/head";
import dynamic from "next/dynamic";
import { createGlobalStyle } from "styled-components";

import "antd/dist/antd.css";

const GlobalStyle = createGlobalStyle`
  .global {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    color: black;
  }
  .font-small {
    font-size: 12px;
  }
  .font-large {
    font-size: 16px;
  }
  .font-title {
    font-size: 20px;
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
      <Loading />
      <div className="global">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
