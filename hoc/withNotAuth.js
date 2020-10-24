import { Component } from "react";
import cookie from "../tools/cookie";
import Router from "next/router";

const withNotAuth = (WrappedComponent, cookies) => {
  return class ComponentWithAuth extends Component {
    static async getInitialProps(ctx) {
      const jwt = cookie.getJWT(ctx);
      if(jwt)
      {
        if (ctx.res) {
          ctx.res.writeHead(302, {
            Location: '/console/systems'
          })
          ctx.res.end()
        } else {
          Router.push('/console/systems')
        }
      }
      // Check if Page has a `getInitialProps`; if so, call it.
      const pageProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx);
      // Return props.
      return { ...pageProps }
    }
    render() {
      return <WrappedComponent />;
    }
  };
};

export default withNotAuth;
