import { Component } from "react";
import cookie from "../tools/cookie";
import Router from "next/router";

const withAuth = (WrappedComponent) => {
  return class ComponentWithAuth extends Component {
    static async getInitialProps(ctx) {

      const jwt = cookie.getJWT(ctx);
      if (!jwt) {
        if (ctx.res) {
          ctx.res.writeHead(302, {
            Location: "/login",
          });
          ctx.res.end();
        } else {
          Router.push("/login");
        }
      }
      // Check if Page has a `getInitialProps`; if so, call it.
      const pageProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));
      // Return props.
      return { ...pageProps };
    }
    
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withAuth;
