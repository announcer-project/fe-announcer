import Head from "next/head";
import axios from "axios";
import cookie from "../../tools/cookie";
import { withNotAuthRegister } from "../../tools/withNotAuth";

import Page from "../../components/Register/RegisterPage";
import { RegisterProvider } from "../../store/RegisterProvider";

function RegisterPage(props) {
  return (
    <>
      <Head>
        <title>Announcer - Register</title>
      </Head>
      <RegisterProvider>
        <Page {...props} />
      </RegisterProvider>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await withNotAuthRegister(ctx);
  // const { code, state } = ctx.query;
  return { props: { query: ctx.query } };
}

export default RegisterPage;
