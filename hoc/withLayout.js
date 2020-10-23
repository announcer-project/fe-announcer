import { Component } from "react";
import Layout from "../components/Layouts/Layouts";

const withAuth = (WrappedComponent) => {
  return class ComponentWithAuth extends Component {
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

export default withAuth;
