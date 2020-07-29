import Head from "next/head";
import axios from "axios";
import cookie from "../../tools/cookie";
import { withNotAuth } from "../../tools/withNotAuth";

import Page from "../../components/Register/RegisterPage";
import { RegisterProvider } from "../../store/RegisterProvider";

function RegisterPage() {
  return (
    <>
      <Head>
        <title>NMS - Login</title>
      </Head>
      <RegisterProvider>
          <Page/>
      </RegisterProvider>
    </>
  );
}

export default RegisterPage;
