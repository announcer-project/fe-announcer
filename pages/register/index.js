import Head from "next/head";
import withNotAuth from "../../hoc/withNotAuth";
import withLayout from "../../hoc/withLayout";

import Page from "../../components/Register/RegisterPage";
import { RegisterProvider } from "../../store/RegisterProvider";

function RegisterPage({ systemname }) {
  return (
    <>
      <Head>
        <title>Announcer - Register</title>
      </Head>
      <RegisterProvider>
        <Page />
      </RegisterProvider>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { systemname: ctx.query.systemname };
}

export default withNotAuth(withLayout(RegisterPage));
