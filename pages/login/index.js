import Head from "next/head";
import dynamic from "next/dynamic";
import withNotAuth from "../../hoc/withNotAuth"

const Page = dynamic(
  () => {
    return import("../../components/Login/LoginPage");
  },
  { ssr: false }
);

function LoginPage() {
  return (
    <>
      <Head>
        <title>Announcer - Login</title>
      </Head>
      <Page />
    </>
  );
}

LoginPage.getInitialProps = async (ctx) => {
  return { page: "login" };
};

export default withNotAuth(LoginPage);
