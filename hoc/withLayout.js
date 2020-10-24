import { Component } from "react";
import Layout from "../components/Layouts/Layouts";

const withLayout = (WrappedComponent) => {
  return class ComponentwithLayout extends Component {
    static async getInitialProps(ctx) {
      const pageProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));
      return { ...pageProps };
    }

    render() {
      return (
        <>
          <Layout>
            <WrappedComponent />
          </Layout>
        </>
      );
    }
  };
};

export default withLayout;
